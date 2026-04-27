"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { COMPANY_LINKS, COMPANY_MATRIX_LAYERS, COMPANY_NODES, NARRATIVE_LABELS } from "@/lib/company-matrix/data";
import { filterCompanyNodes, getRenderableLinks, layerLabel } from "@/lib/company-matrix/model";
import type {
  CompanyMatrixFilters,
  CompanyNarrative,
  CompanyNode,
  LinkStrength,
  RenderableCompanyLink
} from "@/lib/company-matrix/types";

const ALL_NARRATIVES = Object.keys(NARRATIVE_LABELS) as CompanyNarrative[];
const ALL_STRENGTHS: LinkStrength[] = ["core", "strong", "weak"];
const DEFAULT_FILTERS: CompanyMatrixFilters = {
  narratives: [],
  layers: [],
  strengths: ["core", "strong"]
};

const LAYER_LABEL_ZH: Record<number, string> = {
  1: "未来叙事",
  2: "应用层",
  3: "软件 / 数据 / 云",
  4: "算力层",
  5: "制造 / 设备 / 设计",
  6: "能源 / 材料 / 物理基建",
  7: "资本 / 国防 / 地缘约束"
};

const ROLE_LABELS: Record<CompanyNode["role"], string> = {
  "core dependency": "核心依赖",
  "second-order beneficiary": "二阶受益",
  "constraint variable": "约束变量",
  "narrative spillover": "叙事外溢"
};

const LINK_ROLE_LABELS: Record<RenderableCompanyLink["role"], string> = {
  supplies: "供应",
  depends_on: "依赖",
  competes_with: "竞争",
  enables: "赋能",
  constrains: "约束",
  finances: "融资",
  hedges: "对冲"
};

const STRENGTH_LABELS: Record<LinkStrength, string> = {
  core: "核心",
  strong: "强",
  weak: "弱"
};

const NODE_COLORS: Record<CompanyNode["role"], number> = {
  "core dependency": 0xe8c97a,
  "second-order beneficiary": 0x79c7ff,
  "constraint variable": 0xff7c8a,
  "narrative spillover": 0xa78bfa
};

const LINK_COLORS: Record<LinkStrength, number> = {
  core: 0xe8c97a,
  strong: 0x78c7ff,
  weak: 0x8a8f98
};

interface NodePosition {
  x: number;
  y: number;
  z: number;
}

function toggleListValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function pyramidPosition(node: CompanyNode, indexInLayer: number, layerSize: number): NodePosition {
  const layerDepth = node.primaryLayer - 1;
  const radius = 1.2 + layerDepth * 1.22;
  const angle = (indexInLayer / Math.max(layerSize, 1)) * Math.PI * 2 + layerDepth * 0.34;

  return {
    x: Math.cos(angle) * radius,
    y: 7.8 - layerDepth * 2.15,
    z: Math.sin(angle) * radius
  };
}

function buildPositions(nodes: CompanyNode[]): Map<string, NodePosition> {
  const byLayer = new Map<number, CompanyNode[]>();

  for (const node of nodes) {
    byLayer.set(node.primaryLayer, [...(byLayer.get(node.primaryLayer) ?? []), node]);
  }

  const positions = new Map<string, NodePosition>();
  for (const layerNodes of byLayer.values()) {
    layerNodes.forEach((node, index) => {
      positions.set(node.ticker, pyramidPosition(node, index, layerNodes.length));
    });
  }

  return positions;
}

function makeTickerSprite(ticker: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 96;
  const context = canvas.getContext("2d");

  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(8, 8, 12, 0.68)";
    context.strokeStyle = "rgba(232, 201, 122, 0.58)";
    context.lineWidth = 2;
    context.roundRect(36, 20, 184, 52, 14);
    context.fill();
    context.stroke();
    context.font = "700 34px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#f4f4f5";
    context.fillText(ticker, 128, 48);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.25, 0.48, 1);

  return sprite;
}

function disposeObject(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.Sprite) {
      const material = child.material;
      if (Array.isArray(material)) {
        material.forEach((entry) => entry.dispose());
      } else {
        if ("map" in material && material.map instanceof THREE.Texture) {
          material.map.dispose();
        }
        material.dispose();
      }
      if ("geometry" in child && child.geometry instanceof THREE.BufferGeometry) {
        child.geometry.dispose();
      }
    }
  });
}

export function MatrixView(): JSX.Element {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState<CompanyMatrixFilters>(DEFAULT_FILTERS);
  const [selectedTicker, setSelectedTicker] = useState("NVDA");
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);

  const visibleNodes = useMemo(() => filterCompanyNodes(COMPANY_NODES, filters), [filters]);
  const visibleLinks = useMemo(() => getRenderableLinks(COMPANY_NODES, COMPANY_LINKS, filters), [filters]);
  const selectedCompany = useMemo(
    () => visibleNodes.find((node) => node.ticker === selectedTicker) ?? visibleNodes[0] ?? COMPANY_NODES[0],
    [selectedTicker, visibleNodes]
  );
  const selectedLinks = useMemo(
    () => visibleLinks.filter((link) => link.source.ticker === selectedCompany.ticker || link.target.ticker === selectedCompany.ticker),
    [selectedCompany.ticker, visibleLinks]
  );

  const toggleNarrative = useCallback((narrative: CompanyNarrative) => {
    setFilters((current) => ({ ...current, narratives: toggleListValue(current.narratives, narrative) }));
  }, []);

  const toggleLayer = useCallback((layer: number) => {
    setFilters((current) => ({ ...current, layers: toggleListValue(current.layers, layer) }));
  }, []);

  const toggleStrength = useCallback((strength: LinkStrength) => {
    setFilters((current) => ({ ...current, strengths: toggleListValue(current.strengths, strength) }));
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07080b);
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 1000);
    camera.position.set(0, 7.8, 17.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 8;
    controls.maxDistance = 28;
    controls.target.set(0, 1.1, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.48));
    const keyLight = new THREE.DirectionalLight(0xf8d47b, 1.25);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);
    const sideLight = new THREE.PointLight(0x79c7ff, 2.2, 40);
    sideLight.position.set(-8, 2, 8);
    scene.add(sideLight);

    const root = new THREE.Group();
    scene.add(root);

    const positions = buildPositions(visibleNodes);
    const nodeMeshes: THREE.Mesh[] = [];
    const selectedConnections = new Set(
      visibleLinks
        .filter((link) => link.source.ticker === selectedCompany.ticker || link.target.ticker === selectedCompany.ticker)
        .flatMap((link) => [link.source.ticker, link.target.ticker])
    );

    for (const layer of COMPANY_MATRIX_LAYERS.slice(1)) {
      const layerDepth = layer.id - 1;
      const y = 7.8 - layerDepth * 2.15;
      const radius = 1.2 + layerDepth * 1.22;
      const ringGeometry = new THREE.RingGeometry(Math.max(radius - 0.02, 0.08), radius + 0.02, 96);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x2b3440,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      root.add(ring);
    }

    for (const link of visibleLinks) {
      const source = positions.get(link.source.ticker);
      const target = positions.get(link.target.ticker);
      if (!source || !target) {
        continue;
      }

      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(source.x, source.y, source.z),
        new THREE.Vector3(target.x, target.y, target.z)
      ]);
      const isSelected = link.source.ticker === selectedCompany.ticker || link.target.ticker === selectedCompany.ticker;
      const material = new THREE.LineBasicMaterial({
        color: LINK_COLORS[link.strength],
        transparent: true,
        opacity: isSelected ? 0.84 : link.strength === "weak" ? 0.16 : 0.32
      });
      root.add(new THREE.Line(geometry, material));
    }

    for (const node of visibleNodes) {
      const position = positions.get(node.ticker);
      if (!position) {
        continue;
      }

      const isSelected = node.ticker === selectedCompany.ticker;
      const isConnected = selectedConnections.has(node.ticker);
      const geometry = new THREE.SphereGeometry(isSelected ? 0.34 : 0.25, 28, 20);
      const material = new THREE.MeshStandardMaterial({
        color: NODE_COLORS[node.role],
        emissive: NODE_COLORS[node.role],
        emissiveIntensity: isSelected ? 0.45 : isConnected ? 0.24 : 0.08,
        roughness: 0.32,
        metalness: 0.35
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position.x, position.y, position.z);
      mesh.userData = { ticker: node.ticker };
      root.add(mesh);
      nodeMeshes.push(mesh);

      const sprite = makeTickerSprite(node.ticker);
      sprite.position.set(position.x, position.y + 0.52, position.z);
      root.add(sprite);
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const updatePointer = (event: PointerEvent): void => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerMove = (event: PointerEvent): void => {
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0];
      const ticker = typeof hit?.object.userData.ticker === "string" ? hit.object.userData.ticker : null;
      renderer.domElement.style.cursor = ticker ? "pointer" : "grab";
      setHoveredTicker(ticker);
    };

    const handlePointerDown = (event: PointerEvent): void => {
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0];
      const ticker = typeof hit?.object.userData.ticker === "string" ? hit.object.userData.ticker : null;
      if (ticker) {
        setSelectedTicker(ticker);
      }
    };

    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    const resizeObserver = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    resizeObserver.observe(mount);

    let frame = 0;
    let animationId = 0;
    const animate = (): void => {
      frame += 1;
      root.rotation.y = Math.sin(frame / 420) * 0.08;
      controls.update();
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      controls.dispose();
      disposeObject(root);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [selectedCompany.ticker, visibleLinks, visibleNodes]);

  return (
    <main className="matrix-shell">
      <a href="/museum.html" className="matrix-back" aria-label="返回博物馆">← 返回博物馆</a>
      <section className="matrix-stage" aria-label="文明产业金字塔三维视图">
        <div ref={mountRef} className="matrix-canvas" />
        <div className="matrix-head">
          <div>
            <p className="matrix-kicker">US STOCK DEPENDENCY MAP</p>
            <h1>文明产业金字塔</h1>
          </div>
          <div className="matrix-count">
            <strong>{visibleNodes.length}</strong>
            <span>家公司</span>
            <strong>{visibleLinks.length}</strong>
            <span>条链接</span>
          </div>
        </div>
        <div className="matrix-hover" aria-live="polite">
          {hoveredTicker ? `正在指向 ${hoveredTicker}` : "拖拽旋转，滚轮缩放，点击公司查看关系"}
        </div>
      </section>

      <aside className="matrix-side" aria-label="公司关系控制台">
        <section className="matrix-panel matrix-selected">
          <div className="matrix-selected-head">
            <div>
              <p>{ROLE_LABELS[selectedCompany.role]}</p>
              <h2>{selectedCompany.ticker}</h2>
            </div>
            <span>{LAYER_LABEL_ZH[selectedCompany.primaryLayer]}</span>
          </div>
          <h3>{selectedCompany.name}</h3>
          <p>{selectedCompany.thesis}</p>
          <div className="matrix-tags">
            {selectedCompany.narratives.map((narrative) => (
              <span key={narrative}>{NARRATIVE_LABELS[narrative]}</span>
            ))}
          </div>
        </section>

        <section className="matrix-panel">
          <div className="matrix-panel-title">关系</div>
          <div className="matrix-link-list">
            {selectedLinks.length === 0 ? (
              <p className="matrix-muted">当前过滤下没有直接链接。</p>
            ) : (
              selectedLinks.map((link) => {
                const peer = link.source.ticker === selectedCompany.ticker ? link.target : link.source;
                return (
                  <button key={`${link.source.ticker}-${link.target.ticker}-${link.role}`} onClick={() => setSelectedTicker(peer.ticker)}>
                    <span>{peer.ticker}</span>
                    <strong>{LINK_ROLE_LABELS[link.role]} / {STRENGTH_LABELS[link.strength]}</strong>
                    <em>{link.thesis}</em>
                  </button>
                );
              })
            )}
          </div>
        </section>

        <section className="matrix-panel">
          <div className="matrix-panel-title">叙事</div>
          <div className="matrix-chip-grid">
            {ALL_NARRATIVES.map((narrative) => (
              <button
                key={narrative}
                className={filters.narratives.includes(narrative) ? "is-active" : ""}
                onClick={() => toggleNarrative(narrative)}
              >
                {NARRATIVE_LABELS[narrative]}
              </button>
            ))}
          </div>
        </section>

        <section className="matrix-panel">
          <div className="matrix-panel-title">层级</div>
          <div className="matrix-chip-grid compact">
            {COMPANY_MATRIX_LAYERS.slice(1).map((layer) => (
              <button
                key={layer.id}
                className={filters.layers.includes(layer.id) ? "is-active" : ""}
                onClick={() => toggleLayer(layer.id)}
                title={layer.summary}
              >
                {layer.id}. {LAYER_LABEL_ZH[layer.id] ?? layerLabel(COMPANY_MATRIX_LAYERS, layer.id)}
              </button>
            ))}
          </div>
        </section>

        <section className="matrix-panel">
          <div className="matrix-panel-title">链接强度</div>
          <div className="matrix-strength-row">
            {ALL_STRENGTHS.map((strength) => (
              <button
                key={strength}
                className={filters.strengths.includes(strength) ? "is-active" : ""}
                onClick={() => toggleStrength(strength)}
              >
                {STRENGTH_LABELS[strength]}
              </button>
            ))}
            <button onClick={() => setFilters(DEFAULT_FILTERS)}>重置</button>
          </div>
        </section>
      </aside>
    </main>
  );
}
