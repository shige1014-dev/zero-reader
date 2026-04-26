# Company Dependency Pyramid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/matrix`, a 3D company dependency pyramid for US stocks with layered company nodes, cross-layer relationship links, filters, and a selected-company detail panel.

**Architecture:** Add a static company graph under `lib/company-matrix/` with pure filtering/render-prep helpers and unit tests. Add a new Next.js route under `app/matrix/` that renders a full-viewport Three.js scene in a client component, with React state for filters, hover, and selection. Keep v1 static and deterministic: no database, no live prices, no external market API.

**Tech Stack:** Next.js 14, React 18, TypeScript strict mode, Three.js, Node test runner with `tsx`, existing CSS in `app/globals.css`.

---

## File Structure

- Create `lib/company-matrix/types.ts`: shared data types for layers, narratives, companies, links, filters, and renderable links.
- Create `lib/company-matrix/data.ts`: static v1 company/layer/link dataset.
- Create `lib/company-matrix/model.ts`: pure helpers for validation, filtering, and renderable link preparation.
- Create `tests/company-matrix.test.ts`: unit tests for uniqueness, link integrity, filters, and unknown-link exclusion.
- Create `app/matrix/page.tsx`: server route wrapper and metadata.
- Create `app/matrix/matrix-view.tsx`: client component with Three.js scene and React controls.
- Modify `app/globals.css`: layout and terminal-style UI for `/matrix`.
- Modify `package.json` and `package-lock.json`: add `three` and `@types/three`.

This workspace currently is not a git repository. Skip commit steps here and record changed files in the final implementation summary.

---

### Task 1: Static Data Model

**Files:**
- Create: `lib/company-matrix/types.ts`
- Create: `lib/company-matrix/data.ts`
- Create: `lib/company-matrix/model.ts`
- Test: `tests/company-matrix.test.ts`

- [ ] **Step 1: Write the failing model tests**

Create `tests/company-matrix.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";

import { COMPANY_LINKS, COMPANY_MATRIX_LAYERS, COMPANY_NODES } from "@/lib/company-matrix/data";
import {
  filterCompanyNodes,
  getCompanyByTicker,
  getRenderableLinks,
  layerLabel,
  validateCompanyMatrix
} from "@/lib/company-matrix/model";

test("company matrix data has unique tickers", () => {
  const result = validateCompanyMatrix(COMPANY_NODES, COMPANY_LINKS);

  assert.deepEqual(result.duplicateTickers, []);
});

test("company matrix links reference known tickers", () => {
  const result = validateCompanyMatrix(COMPANY_NODES, COMPANY_LINKS);

  assert.deepEqual(result.unknownLinkTickers, []);
});

test("filterCompanyNodes filters by narrative", () => {
  const nodes = filterCompanyNodes(COMPANY_NODES, { narratives: ["ai-agents"], layers: [], strengths: [] });

  assert.ok(nodes.some((node) => node.ticker === "NVDA"));
  assert.ok(nodes.some((node) => node.ticker === "MSFT"));
  assert.equal(nodes.some((node) => node.ticker === "XOM"), false);
});

test("filterCompanyNodes filters by layer", () => {
  const nodes = filterCompanyNodes(COMPANY_NODES, { narratives: [], layers: [4], strengths: [] });

  assert.ok(nodes.length > 0);
  assert.equal(nodes.every((node) => node.primaryLayer === 4), true);
});

test("getRenderableLinks excludes links with unknown endpoints and supports strength filters", () => {
  const links = getRenderableLinks(
    COMPANY_NODES,
    [
      ...COMPANY_LINKS,
      { source: "NVDA", target: "UNKNOWN", strength: "core", role: "depends_on", thesis: "bad link" }
    ],
    { narratives: [], layers: [], strengths: ["core"] }
  );

  assert.ok(links.length > 0);
  assert.equal(links.every((link) => link.strength === "core"), true);
  assert.equal(links.some((link) => link.target.ticker === "UNKNOWN"), false);
});

test("getCompanyByTicker and layerLabel return expected display values", () => {
  assert.equal(getCompanyByTicker(COMPANY_NODES, "nvda")?.name, "NVIDIA");
  assert.equal(layerLabel(COMPANY_MATRIX_LAYERS, 4), "Compute Layer");
});
```

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
node --import tsx --test tests/company-matrix.test.ts
```

Expected: FAIL because `@/lib/company-matrix/data` and `@/lib/company-matrix/model` do not exist.

- [ ] **Step 3: Create types**

Create `lib/company-matrix/types.ts`:

```ts
export type CompanyNarrative =
  | "ai-agents"
  | "energy-reconstruction"
  | "defense-autonomy"
  | "space-infrastructure"
  | "automated-production"
  | "financial-data-intelligence";

export type CompanyRole = "core dependency" | "second-order beneficiary" | "constraint variable" | "narrative spillover";

export type LinkStrength = "core" | "strong" | "weak";

export type LinkRole = "supplies" | "depends_on" | "competes_with" | "enables" | "constrains" | "finances" | "hedges";

export interface MatrixLayer {
  id: number;
  label: string;
  summary: string;
}

export interface CompanyNode {
  ticker: string;
  name: string;
  primaryLayer: number;
  secondaryLayers: number[];
  narratives: CompanyNarrative[];
  role: CompanyRole;
  thesis: string;
}

export interface CompanyLink {
  source: string;
  target: string;
  strength: LinkStrength;
  role: LinkRole;
  thesis: string;
}

export interface CompanyMatrixFilters {
  narratives: CompanyNarrative[];
  layers: number[];
  strengths: LinkStrength[];
}

export interface RenderableCompanyLink extends Omit<CompanyLink, "source" | "target"> {
  source: CompanyNode;
  target: CompanyNode;
}

export interface MatrixValidationResult {
  duplicateTickers: string[];
  unknownLinkTickers: string[];
}
```

- [ ] **Step 4: Create static data**

Create `lib/company-matrix/data.ts`:

```ts
import type { CompanyLink, CompanyNarrative, CompanyNode, MatrixLayer } from "@/lib/company-matrix/types";

export const NARRATIVE_LABELS: Record<CompanyNarrative, string> = {
  "ai-agents": "AI Agents",
  "energy-reconstruction": "Energy Reconstruction",
  "defense-autonomy": "Defense Autonomy",
  "space-infrastructure": "Space Infrastructure",
  "automated-production": "Automated Production",
  "financial-data-intelligence": "Financial / Data Intelligence"
};

export const COMPANY_MATRIX_LAYERS: MatrixLayer[] = [
  { id: 1, label: "Future Narratives", summary: "Outcome layer: where the market narrative becomes visible." },
  { id: 2, label: "Application Layer", summary: "Companies that package future narratives into products and platforms." },
  { id: 3, label: "Software / Data / Cloud Layer", summary: "Data, workflow, cloud, security, and enterprise software substrate." },
  { id: 4, label: "Compute Layer", summary: "GPU, networking, memory, servers, and silicon infrastructure." },
  { id: 5, label: "Manufacturing / Equipment / Design Layer", summary: "Foundry, lithography, EDA, and semiconductor equipment." },
  { id: 6, label: "Energy / Materials / Physical Infrastructure Layer", summary: "Power, grid, uranium, copper, and physical bottlenecks." },
  { id: 7, label: "Capital / Defense / Geopolitical Constraint Layer", summary: "Capital markets, defense, industrial cycle, and policy constraints." }
];

export const COMPANY_NODES: CompanyNode[] = [
  { ticker: "MSFT", name: "Microsoft", primaryLayer: 2, secondaryLayers: [3, 4], narratives: ["ai-agents", "financial-data-intelligence"], role: "core dependency", thesis: "Owns enterprise distribution, cloud demand, and AI workflow packaging." },
  { ticker: "GOOGL", name: "Alphabet", primaryLayer: 2, secondaryLayers: [3, 4], narratives: ["ai-agents", "financial-data-intelligence"], role: "core dependency", thesis: "Combines search distribution, Gemini, cloud, and internal silicon demand." },
  { ticker: "META", name: "Meta Platforms", primaryLayer: 2, secondaryLayers: [4], narratives: ["ai-agents"], role: "second-order beneficiary", thesis: "Turns AI infrastructure into advertising, engagement, and creator tooling leverage." },
  { ticker: "AMZN", name: "Amazon", primaryLayer: 2, secondaryLayers: [3, 4], narratives: ["ai-agents", "automated-production"], role: "core dependency", thesis: "AWS and logistics make Amazon both compute buyer and automation operator." },
  { ticker: "TSLA", name: "Tesla", primaryLayer: 2, secondaryLayers: [6], narratives: ["automated-production", "energy-reconstruction"], role: "narrative spillover", thesis: "Sits across EVs, autonomy, batteries, robotics, and energy storage." },
  { ticker: "PLTR", name: "Palantir", primaryLayer: 2, secondaryLayers: [3, 7], narratives: ["defense-autonomy", "financial-data-intelligence"], role: "second-order beneficiary", thesis: "Packages operational data into defense, enterprise, and AI workflow decisions." },
  { ticker: "APP", name: "AppLovin", primaryLayer: 2, secondaryLayers: [3], narratives: ["ai-agents", "financial-data-intelligence"], role: "narrative spillover", thesis: "Shows how AI optimization can turn data loops into high-margin application economics." },
  { ticker: "NOW", name: "ServiceNow", primaryLayer: 2, secondaryLayers: [3], narratives: ["ai-agents", "financial-data-intelligence"], role: "second-order beneficiary", thesis: "Enterprise workflow layer where agents can become operational tools." },

  { ticker: "SNOW", name: "Snowflake", primaryLayer: 3, secondaryLayers: [], narratives: ["financial-data-intelligence", "ai-agents"], role: "second-order beneficiary", thesis: "Data cloud that benefits when enterprise data becomes AI-ready." },
  { ticker: "CRM", name: "Salesforce", primaryLayer: 3, secondaryLayers: [2], narratives: ["ai-agents", "financial-data-intelligence"], role: "second-order beneficiary", thesis: "Customer workflow and data layer for enterprise AI features." },
  { ticker: "ORCL", name: "Oracle", primaryLayer: 3, secondaryLayers: [4], narratives: ["ai-agents"], role: "core dependency", thesis: "Database and cloud capacity increasingly tied to AI infrastructure demand." },
  { ticker: "MDB", name: "MongoDB", primaryLayer: 3, secondaryLayers: [], narratives: ["financial-data-intelligence"], role: "second-order beneficiary", thesis: "Application database layer for software teams building data-heavy products." },
  { ticker: "DDOG", name: "Datadog", primaryLayer: 3, secondaryLayers: [], narratives: ["financial-data-intelligence"], role: "constraint variable", thesis: "Observability spend tracks cloud complexity and AI operations pressure." },
  { ticker: "NET", name: "Cloudflare", primaryLayer: 3, secondaryLayers: [4], narratives: ["ai-agents", "financial-data-intelligence"], role: "second-order beneficiary", thesis: "Edge network and security layer that can host inference and protect traffic." },
  { ticker: "CRWD", name: "CrowdStrike", primaryLayer: 3, secondaryLayers: [], narratives: ["financial-data-intelligence", "defense-autonomy"], role: "constraint variable", thesis: "Security becomes a constraint as AI and automation expand attack surfaces." },
  { ticker: "PANW", name: "Palo Alto Networks", primaryLayer: 3, secondaryLayers: [], narratives: ["financial-data-intelligence", "defense-autonomy"], role: "constraint variable", thesis: "Platform security provider tied to cloud, AI, and enterprise risk budgets." },

  { ticker: "NVDA", name: "NVIDIA", primaryLayer: 4, secondaryLayers: [2], narratives: ["ai-agents", "automated-production"], role: "core dependency", thesis: "Primary compute bottleneck and accelerator ecosystem for AI demand." },
  { ticker: "AMD", name: "AMD", primaryLayer: 4, secondaryLayers: [], narratives: ["ai-agents"], role: "second-order beneficiary", thesis: "Alternative accelerator and CPU supplier when compute demand broadens." },
  { ticker: "AVGO", name: "Broadcom", primaryLayer: 4, secondaryLayers: [3, 5], narratives: ["ai-agents", "financial-data-intelligence"], role: "core dependency", thesis: "Custom silicon, networking, and software cash flow meet AI infrastructure." },
  { ticker: "ANET", name: "Arista Networks", primaryLayer: 4, secondaryLayers: [], narratives: ["ai-agents"], role: "core dependency", thesis: "Data center networking bottleneck for cloud and AI clusters." },
  { ticker: "MRVL", name: "Marvell", primaryLayer: 4, secondaryLayers: [], narratives: ["ai-agents"], role: "second-order beneficiary", thesis: "Custom silicon and connectivity supplier for hyperscale infrastructure." },
  { ticker: "SMCI", name: "Super Micro Computer", primaryLayer: 4, secondaryLayers: [], narratives: ["ai-agents"], role: "narrative spillover", thesis: "Server assembly proxy for AI rack demand and execution risk." },
  { ticker: "DELL", name: "Dell Technologies", primaryLayer: 4, secondaryLayers: [2], narratives: ["ai-agents", "automated-production"], role: "second-order beneficiary", thesis: "Enterprise server and AI infrastructure distribution channel." },
  { ticker: "MU", name: "Micron", primaryLayer: 4, secondaryLayers: [5], narratives: ["ai-agents"], role: "constraint variable", thesis: "Memory and HBM supply shape the economics of accelerator systems." },

  { ticker: "TSM", name: "Taiwan Semiconductor", primaryLayer: 5, secondaryLayers: [], narratives: ["ai-agents", "automated-production"], role: "core dependency", thesis: "Foundry bottleneck for advanced chips and AI accelerators." },
  { ticker: "ASML", name: "ASML", primaryLayer: 5, secondaryLayers: [], narratives: ["ai-agents"], role: "core dependency", thesis: "Lithography monopoly that constrains leading-edge chip supply." },
  { ticker: "AMAT", name: "Applied Materials", primaryLayer: 5, secondaryLayers: [], narratives: ["ai-agents", "automated-production"], role: "core dependency", thesis: "Broad semiconductor equipment supplier for capacity expansion." },
  { ticker: "LRCX", name: "Lam Research", primaryLayer: 5, secondaryLayers: [], narratives: ["ai-agents"], role: "second-order beneficiary", thesis: "Etch and deposition exposure to memory and logic capex." },
  { ticker: "KLAC", name: "KLA", primaryLayer: 5, secondaryLayers: [], narratives: ["ai-agents"], role: "constraint variable", thesis: "Process control layer that protects yield at advanced nodes." },
  { ticker: "SNPS", name: "Synopsys", primaryLayer: 5, secondaryLayers: [3], narratives: ["ai-agents", "automated-production"], role: "core dependency", thesis: "EDA and IP tooling required for chip design complexity." },
  { ticker: "CDNS", name: "Cadence Design Systems", primaryLayer: 5, secondaryLayers: [3], narratives: ["ai-agents", "automated-production"], role: "core dependency", thesis: "Chip and system design tooling for silicon and simulation workflows." },
  { ticker: "ARM", name: "Arm Holdings", primaryLayer: 5, secondaryLayers: [4], narratives: ["ai-agents"], role: "second-order beneficiary", thesis: "Instruction-set and IP layer for efficient compute designs." },

  { ticker: "CEG", name: "Constellation Energy", primaryLayer: 6, secondaryLayers: [], narratives: ["energy-reconstruction", "ai-agents"], role: "constraint variable", thesis: "Nuclear power supply becomes a data center constraint and premium asset." },
  { ticker: "VST", name: "Vistra", primaryLayer: 6, secondaryLayers: [], narratives: ["energy-reconstruction", "ai-agents"], role: "constraint variable", thesis: "Power generation exposure to AI data center load growth." },
  { ticker: "CCJ", name: "Cameco", primaryLayer: 6, secondaryLayers: [], narratives: ["energy-reconstruction"], role: "core dependency", thesis: "Uranium supply chain proxy for nuclear power rebuild." },
  { ticker: "ETN", name: "Eaton", primaryLayer: 6, secondaryLayers: [], narratives: ["energy-reconstruction", "automated-production"], role: "core dependency", thesis: "Electrical equipment supplier for grid, data center, and industrial electrification." },
  { ticker: "PWR", name: "Quanta Services", primaryLayer: 6, secondaryLayers: [], narratives: ["energy-reconstruction"], role: "core dependency", thesis: "Grid construction and transmission bottleneck contractor." },
  { ticker: "GEV", name: "GE Vernova", primaryLayer: 6, secondaryLayers: [7], narratives: ["energy-reconstruction", "automated-production"], role: "constraint variable", thesis: "Power equipment and grid modernization exposure." },
  { ticker: "NEM", name: "Newmont", primaryLayer: 6, secondaryLayers: [7], narratives: ["energy-reconstruction"], role: "hedges" as never, thesis: "Gold and resource hedge when capital and geopolitical stress rise." },
  { ticker: "FCX", name: "Freeport-McMoRan", primaryLayer: 6, secondaryLayers: [], narratives: ["energy-reconstruction", "automated-production"], role: "constraint variable", thesis: "Copper supply proxy for electrification and grid capex." },

  { ticker: "JPM", name: "JPMorgan Chase", primaryLayer: 7, secondaryLayers: [], narratives: ["financial-data-intelligence"], role: "constraint variable", thesis: "Capital availability and credit cycle shape all long-duration narratives." },
  { ticker: "GS", name: "Goldman Sachs", primaryLayer: 7, secondaryLayers: [], narratives: ["financial-data-intelligence"], role: "second-order beneficiary", thesis: "Capital markets and deal activity reflect narrative monetization." },
  { ticker: "LMT", name: "Lockheed Martin", primaryLayer: 7, secondaryLayers: [2], narratives: ["defense-autonomy", "space-infrastructure"], role: "core dependency", thesis: "Prime defense platform tied to missiles, space, and autonomy budgets." },
  { ticker: "RTX", name: "RTX", primaryLayer: 7, secondaryLayers: [], narratives: ["defense-autonomy", "space-infrastructure"], role: "core dependency", thesis: "Defense and aerospace supply chain exposure." },
  { ticker: "NOC", name: "Northrop Grumman", primaryLayer: 7, secondaryLayers: [], narratives: ["defense-autonomy", "space-infrastructure"], role: "core dependency", thesis: "Defense autonomy, aerospace, and strategic systems exposure." },
  { ticker: "BA", name: "Boeing", primaryLayer: 7, secondaryLayers: [], narratives: ["space-infrastructure", "defense-autonomy"], role: "constraint variable", thesis: "Aerospace industrial execution risk and defense backlog proxy." },
  { ticker: "CAT", name: "Caterpillar", primaryLayer: 7, secondaryLayers: [6], narratives: ["automated-production", "energy-reconstruction"], role: "constraint variable", thesis: "Heavy equipment cycle tied to infrastructure, mining, and capex." },
  { ticker: "XOM", name: "Exxon Mobil", primaryLayer: 7, secondaryLayers: [6], narratives: ["energy-reconstruction"], role: "hedges" as never, thesis: "Hydrocarbon cash flow hedge during energy transition volatility." }
];

export const COMPANY_LINKS: CompanyLink[] = [
  { source: "MSFT", target: "NVDA", strength: "core", role: "depends_on", thesis: "Azure AI demand depends on accelerator supply." },
  { source: "GOOGL", target: "AVGO", strength: "strong", role: "depends_on", thesis: "Custom silicon and networking relationship for AI infrastructure." },
  { source: "AMZN", target: "ANET", strength: "strong", role: "depends_on", thesis: "AWS scale needs high-performance data center networking." },
  { source: "META", target: "NVDA", strength: "strong", role: "depends_on", thesis: "Model training and recommendation systems drive GPU demand." },
  { source: "NVDA", target: "TSM", strength: "core", role: "depends_on", thesis: "Accelerators require advanced foundry capacity." },
  { source: "AMD", target: "TSM", strength: "core", role: "depends_on", thesis: "Advanced CPUs and GPUs rely on external foundry capacity." },
  { source: "TSM", target: "ASML", strength: "core", role: "depends_on", thesis: "Leading-edge nodes require EUV lithography." },
  { source: "TSM", target: "AMAT", strength: "strong", role: "depends_on", thesis: "Fab expansion depends on broad wafer equipment." },
  { source: "TSM", target: "KLAC", strength: "strong", role: "depends_on", thesis: "Yield control becomes more important at advanced nodes." },
  { source: "MU", target: "LRCX", strength: "strong", role: "depends_on", thesis: "Memory capex flows through etch and deposition equipment." },
  { source: "AVGO", target: "ANET", strength: "weak", role: "enables", thesis: "Networking silicon and switches share AI cluster demand." },
  { source: "SMCI", target: "NVDA", strength: "strong", role: "depends_on", thesis: "AI server demand is tied to GPU availability." },
  { source: "DELL", target: "NVDA", strength: "strong", role: "depends_on", thesis: "Enterprise AI servers depend on accelerator supply." },
  { source: "SNPS", target: "NVDA", strength: "weak", role: "enables", thesis: "EDA complexity enables the next generation of chip design." },
  { source: "CDNS", target: "AVGO", strength: "weak", role: "enables", thesis: "Simulation and design tools support custom silicon." },
  { source: "CEG", target: "MSFT", strength: "strong", role: "constrains", thesis: "Data center growth requires reliable power supply." },
  { source: "VST", target: "AMZN", strength: "strong", role: "constrains", thesis: "Cloud buildout increases demand for dispatchable power." },
  { source: "ETN", target: "CEG", strength: "strong", role: "enables", thesis: "Electrical equipment enables grid and data center power delivery." },
  { source: "PWR", target: "ETN", strength: "strong", role: "enables", thesis: "Grid construction turns equipment demand into physical capacity." },
  { source: "CCJ", target: "CEG", strength: "weak", role: "supplies", thesis: "Uranium supply links nuclear fuel to power economics." },
  { source: "FCX", target: "ETN", strength: "weak", role: "supplies", thesis: "Copper is a material bottleneck for electrification." },
  { source: "PLTR", target: "LMT", strength: "strong", role: "enables", thesis: "Defense data software supports operational decision loops." },
  { source: "LMT", target: "RTX", strength: "strong", role: "depends_on", thesis: "Defense primes share supply chain and missile demand cycles." },
  { source: "NOC", target: "LMT", strength: "strong", role: "competes_with", thesis: "Strategic systems and defense autonomy budgets overlap." },
  { source: "BA", target: "RTX", strength: "weak", role: "depends_on", thesis: "Aerospace programs share engine and supplier constraints." },
  { source: "JPM", target: "MSFT", strength: "weak", role: "finances", thesis: "Credit and capital markets set discount rates for AI capex." },
  { source: "GS", target: "SNOW", strength: "weak", role: "finances", thesis: "Capital markets and software valuations shape growth funding." },
  { source: "XOM", target: "CEG", strength: "weak", role: "hedges", thesis: "Hydrocarbon cash flows hedge energy transition stress." },
  { source: "CAT", target: "FCX", strength: "weak", role: "enables", thesis: "Mining and infrastructure equipment link to copper supply." }
];
```

- [ ] **Step 5: Fix invalid roles in static data**

In `lib/company-matrix/data.ts`, replace the two invalid role casts:

```ts
role: "hedges" as never
```

with:

```ts
role: "constraint variable"
```

This keeps company roles limited to the supported `CompanyRole` union. Link roles still support `hedges`.

- [ ] **Step 6: Create pure model helpers**

Create `lib/company-matrix/model.ts`:

```ts
import type {
  CompanyLink,
  CompanyMatrixFilters,
  CompanyNode,
  MatrixLayer,
  MatrixValidationResult,
  RenderableCompanyLink
} from "@/lib/company-matrix/types";

export function getCompanyByTicker(nodes: CompanyNode[], ticker: string): CompanyNode | null {
  const normalized = ticker.trim().toUpperCase();
  return nodes.find((node) => node.ticker === normalized) ?? null;
}

export function layerLabel(layers: MatrixLayer[], layerId: number): string {
  return layers.find((layer) => layer.id === layerId)?.label ?? `Layer ${layerId}`;
}

export function validateCompanyMatrix(nodes: CompanyNode[], links: CompanyLink[]): MatrixValidationResult {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const node of nodes) {
    if (seen.has(node.ticker)) {
      duplicates.add(node.ticker);
    }
    seen.add(node.ticker);
  }

  const unknown = new Set<string>();
  for (const link of links) {
    if (!seen.has(link.source)) unknown.add(link.source);
    if (!seen.has(link.target)) unknown.add(link.target);
  }

  return {
    duplicateTickers: [...duplicates].sort(),
    unknownLinkTickers: [...unknown].sort()
  };
}

export function filterCompanyNodes(nodes: CompanyNode[], filters: CompanyMatrixFilters): CompanyNode[] {
  return nodes.filter((node) => {
    const narrativeMatch =
      filters.narratives.length === 0 || node.narratives.some((narrative) => filters.narratives.includes(narrative));
    const layerMatch = filters.layers.length === 0 || filters.layers.includes(node.primaryLayer);
    return narrativeMatch && layerMatch;
  });
}

export function getRenderableLinks(
  nodes: CompanyNode[],
  links: CompanyLink[],
  filters: CompanyMatrixFilters
): RenderableCompanyLink[] {
  const visibleNodes = filterCompanyNodes(nodes, filters);
  const visibleByTicker = new Map(visibleNodes.map((node) => [node.ticker, node]));
  const allByTicker = new Map(nodes.map((node) => [node.ticker, node]));

  return links.flatMap((link) => {
    if (filters.strengths.length > 0 && !filters.strengths.includes(link.strength)) {
      return [];
    }

    const source = allByTicker.get(link.source);
    const target = allByTicker.get(link.target);
    if (!source || !target) {
      return [];
    }

    if (!visibleByTicker.has(source.ticker) && !visibleByTicker.has(target.ticker)) {
      return [];
    }

    return [{ ...link, source, target }];
  });
}
```

- [ ] **Step 7: Run tests and verify GREEN**

Run:

```bash
node --import tsx --test tests/company-matrix.test.ts
```

Expected: PASS.

---

### Task 2: Three.js Dependency and Route Shell

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `app/matrix/page.tsx`
- Create: `app/matrix/matrix-view.tsx`

- [ ] **Step 1: Install Three.js dependencies**

Run:

```bash
npm install three @types/three
```

Expected: `package.json` and `package-lock.json` include `three` and `@types/three`.

- [ ] **Step 2: Create the route wrapper**

Create `app/matrix/page.tsx`:

```tsx
import type { Metadata } from "next";

import MatrixView from "@/app/matrix/matrix-view";
import { COMPANY_LINKS, COMPANY_MATRIX_LAYERS, COMPANY_NODES, NARRATIVE_LABELS } from "@/lib/company-matrix/data";

export const metadata: Metadata = {
  title: "文明产业金字塔 | 2076零",
  description: "3D model of company dependencies across future narratives, compute, manufacturing, energy, and capital constraints."
};

export default function MatrixPage(): JSX.Element {
  return (
    <MatrixView
      layers={COMPANY_MATRIX_LAYERS}
      nodes={COMPANY_NODES}
      links={COMPANY_LINKS}
      narrativeLabels={NARRATIVE_LABELS}
    />
  );
}
```

- [ ] **Step 3: Create a minimal client component**

Create `app/matrix/matrix-view.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";

import type { CompanyLink, CompanyMatrixFilters, CompanyNarrative, CompanyNode, LinkStrength, MatrixLayer } from "@/lib/company-matrix/types";
import { filterCompanyNodes, getRenderableLinks, layerLabel } from "@/lib/company-matrix/model";

interface MatrixViewProps {
  layers: MatrixLayer[];
  nodes: CompanyNode[];
  links: CompanyLink[];
  narrativeLabels: Record<CompanyNarrative, string>;
}

const EMPTY_FILTERS: CompanyMatrixFilters = {
  narratives: [],
  layers: [],
  strengths: []
};

export default function MatrixView({ layers, nodes, links, narrativeLabels }: MatrixViewProps): JSX.Element {
  const [filters, setFilters] = useState<CompanyMatrixFilters>(EMPTY_FILTERS);
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  const visibleNodes = useMemo(() => filterCompanyNodes(nodes, filters), [nodes, filters]);
  const visibleLinks = useMemo(() => getRenderableLinks(nodes, links, filters), [nodes, links, filters]);
  const selectedNode = selectedTicker ? nodes.find((node) => node.ticker === selectedTicker) ?? null : null;

  function toggleNarrative(narrative: CompanyNarrative): void {
    setFilters((current) => ({
      ...current,
      narratives: current.narratives.includes(narrative)
        ? current.narratives.filter((item) => item !== narrative)
        : [...current.narratives, narrative]
    }));
  }

  function toggleLayer(layerId: number): void {
    setFilters((current) => ({
      ...current,
      layers: current.layers.includes(layerId)
        ? current.layers.filter((item) => item !== layerId)
        : [...current.layers, layerId]
    }));
  }

  function toggleStrength(strength: LinkStrength): void {
    setFilters((current) => ({
      ...current,
      strengths: current.strengths.includes(strength)
        ? current.strengths.filter((item) => item !== strength)
        : [...current.strengths, strength]
    }));
  }

  return (
    <main className="matrix-page">
      <section className="matrix-toolbar" aria-label="Matrix filters">
        <div>
          <p className="matrix-kicker">2076 ZERO / COMPANY DEPENDENCY MODEL</p>
          <h1>文明产业金字塔</h1>
        </div>
        <button className="matrix-command" type="button" onClick={() => setFilters(EMPTY_FILTERS)}>
          Reset Filters
        </button>
      </section>

      <section className="matrix-layout">
        <aside className="matrix-controls" aria-label="Narrative and layer controls">
          <div className="matrix-control-group">
            <h2>Narratives</h2>
            {Object.entries(narrativeLabels).map(([key, label]) => (
              <button
                className={filters.narratives.includes(key as CompanyNarrative) ? "matrix-chip active" : "matrix-chip"}
                key={key}
                type="button"
                onClick={() => toggleNarrative(key as CompanyNarrative)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="matrix-control-group">
            <h2>Layers</h2>
            {layers.map((layer) => (
              <button
                className={filters.layers.includes(layer.id) ? "matrix-chip active" : "matrix-chip"}
                key={layer.id}
                type="button"
                onClick={() => toggleLayer(layer.id)}
              >
                {layer.id}. {layer.label}
              </button>
            ))}
          </div>

          <div className="matrix-control-group">
            <h2>Links</h2>
            {(["core", "strong", "weak"] as LinkStrength[]).map((strength) => (
              <button
                className={filters.strengths.includes(strength) ? "matrix-chip active" : "matrix-chip"}
                key={strength}
                type="button"
                onClick={() => toggleStrength(strength)}
              >
                {strength}
              </button>
            ))}
          </div>
        </aside>

        <section className="matrix-stage" aria-label="3D company dependency pyramid">
          <div className="matrix-scene-placeholder">
            <p>3D scene mounts in Task 3.</p>
            <p>{visibleNodes.length} visible companies / {visibleLinks.length} visible links</p>
          </div>
        </section>

        <aside className="matrix-detail" aria-label="Selected company details">
          {selectedNode ? (
            <>
              <p className="matrix-kicker">{layerLabel(layers, selectedNode.primaryLayer)}</p>
              <h2>{selectedNode.ticker}</h2>
              <h3>{selectedNode.name}</h3>
              <p>{selectedNode.thesis}</p>
              <p>Role: {selectedNode.role}</p>
            </>
          ) : (
            <>
              <p className="matrix-kicker">No node selected</p>
              <h2>选择一个公司节点</h2>
              <p>点击 3D 场景里的公司节点后，这里会显示它的层级、叙事和直接依赖关系。</p>
            </>
          )}
          <button className="matrix-command" type="button" onClick={() => setSelectedTicker(visibleNodes[0]?.ticker ?? null)}>
            Select First Visible Node
          </button>
        </aside>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS.

---

### Task 3: Three.js Scene

**Files:**
- Modify: `app/matrix/matrix-view.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace placeholder with Three.js mount**

In `app/matrix/matrix-view.tsx`, add these imports:

```tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
```

Change the React import to:

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
```

Add a ref near the state declarations:

```tsx
const sceneRef = useRef<HTMLDivElement | null>(null);
```

Add this effect before `return`:

```tsx
useEffect(() => {
  const host = sceneRef.current;
  if (!host) return;

  const width = host.clientWidth || 900;
  const height = host.clientHeight || 640;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#071011");

  const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 200);
  camera.position.set(0, 12, 24);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  host.replaceChildren(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 3, 0);

  scene.add(new THREE.AmbientLight("#9fd8c8", 0.75));
  const directional = new THREE.DirectionalLight("#d8fff1", 1.2);
  directional.position.set(6, 12, 8);
  scene.add(directional);

  const layerGroup = new THREE.Group();
  const nodeGroup = new THREE.Group();
  const linkGroup = new THREE.Group();
  scene.add(layerGroup, linkGroup, nodeGroup);

  const layerMaterial = new THREE.MeshBasicMaterial({
    color: "#1f6f68",
    transparent: true,
    opacity: 0.13,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  layers.forEach((layer) => {
    const size = 4 + (8 - layer.id) * 1.7;
    const geometry = new THREE.PlaneGeometry(size, size);
    const mesh = new THREE.Mesh(geometry, layerMaterial.clone());
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = (8 - layer.id) * 1.7;
    layerGroup.add(mesh);
  });

  const byTicker = new Map(visibleNodes.map((node, index) => {
    const layerIndex = node.primaryLayer;
    const y = (8 - layerIndex) * 1.7;
    const layerNodes = visibleNodes.filter((item) => item.primaryLayer === layerIndex);
    const positionInLayer = layerNodes.findIndex((item) => item.ticker === node.ticker);
    const count = Math.max(layerNodes.length, 1);
    const angle = (Math.PI * 2 * positionInLayer) / count;
    const radius = 1.2 + layerIndex * 0.75;
    const position = new THREE.Vector3(Math.cos(angle) * radius, y + 0.12, Math.sin(angle) * radius);
    return [node.ticker, { node, position, globalIndex: index }] as const;
  }));

  const nodeGeometry = new THREE.SphereGeometry(0.18, 24, 24);
  visibleNodes.forEach((node) => {
    const item = byTicker.get(node.ticker);
    if (!item) return;
    const material = new THREE.MeshStandardMaterial({
      color: selectedTicker === node.ticker ? "#f5d76e" : "#55d6be",
      emissive: selectedTicker === node.ticker ? "#735f1a" : "#0b3f39",
      roughness: 0.35
    });
    const mesh = new THREE.Mesh(nodeGeometry, material);
    mesh.position.copy(item.position);
    mesh.userData = { ticker: node.ticker };
    nodeGroup.add(mesh);

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(7,16,17,0.72)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#d7fff3";
      ctx.font = "bold 28px monospace";
      ctx.fillText(node.ticker, 16, 40);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
    label.scale.set(1.6, 0.4, 1);
    label.position.copy(item.position).add(new THREE.Vector3(0, 0.42, 0));
    nodeGroup.add(label);
  });

  const linkColors: Record<string, string> = {
    core: "#f5d76e",
    strong: "#55d6be",
    weak: "#5f7f87"
  };

  visibleLinks.forEach((link) => {
    const source = byTicker.get(link.source.ticker);
    const target = byTicker.get(link.target.ticker);
    if (!source || !target) return;
    const geometry = new THREE.BufferGeometry().setFromPoints([source.position, target.position]);
    const material = new THREE.LineBasicMaterial({
      color: linkColors[link.strength],
      transparent: true,
      opacity: link.strength === "weak" ? 0.28 : 0.72
    });
    linkGroup.add(new THREE.Line(geometry, material));
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onPointerDown(event: PointerEvent): void {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(nodeGroup.children, false).find((item) => typeof item.object.userData.ticker === "string");
    if (hit) {
      setSelectedTicker(String(hit.object.userData.ticker));
    }
  }

  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  function animate(): void {
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(animate);
  }

  let frame = requestAnimationFrame(animate);

  function onResize(): void {
    const nextWidth = host.clientWidth || 900;
    const nextHeight = host.clientHeight || 640;
    camera.aspect = nextWidth / nextHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(nextWidth, nextHeight);
  }

  window.addEventListener("resize", onResize);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", onResize);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    controls.dispose();
    renderer.dispose();
    host.replaceChildren();
  };
}, [layers, selectedTicker, visibleLinks, visibleNodes]);
```

Replace the placeholder inside `.matrix-stage` with:

```tsx
{visibleNodes.length > 0 ? (
  <div className="matrix-canvas" ref={sceneRef} />
) : (
  <div className="matrix-empty">当前筛选没有可显示的公司节点。</div>
)}
```

- [ ] **Step 2: Add matrix CSS**

Append to `app/globals.css`:

```css
.matrix-page {
  min-height: 100vh;
  background: #071011;
  color: #d7fff3;
  padding: 18px;
}

.matrix-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.matrix-toolbar h1,
.matrix-detail h2,
.matrix-detail h3,
.matrix-control-group h2 {
  margin: 0;
  letter-spacing: 0;
}

.matrix-toolbar h1 {
  font-size: 24px;
}

.matrix-kicker {
  color: #75a99d;
  font-size: 11px;
  letter-spacing: 0;
  margin: 0 0 6px;
  text-transform: uppercase;
}

.matrix-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 300px;
  gap: 14px;
  min-height: calc(100vh - 92px);
}

.matrix-controls,
.matrix-detail {
  border: 1px solid rgba(117, 169, 157, 0.28);
  background: rgba(9, 24, 24, 0.74);
  padding: 14px;
  overflow: auto;
}

.matrix-control-group {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}

.matrix-control-group h2 {
  color: #d7fff3;
  font-size: 13px;
}

.matrix-chip,
.matrix-command {
  border: 1px solid rgba(117, 169, 157, 0.36);
  background: rgba(16, 42, 40, 0.86);
  color: #d7fff3;
  cursor: pointer;
  font: inherit;
  min-height: 34px;
  padding: 7px 9px;
  text-align: left;
}

.matrix-chip.active,
.matrix-command:hover,
.matrix-chip:hover {
  border-color: #f5d76e;
  color: #f5d76e;
}

.matrix-stage {
  position: relative;
  min-height: 640px;
  border: 1px solid rgba(117, 169, 157, 0.3);
  background: radial-gradient(circle at 50% 30%, rgba(38, 92, 83, 0.28), rgba(7, 16, 17, 0.95) 58%);
  overflow: hidden;
}

.matrix-canvas {
  position: absolute;
  inset: 0;
}

.matrix-canvas canvas {
  display: block;
  height: 100% !important;
  width: 100% !important;
}

.matrix-scene-placeholder,
.matrix-empty {
  display: grid;
  min-height: 640px;
  place-items: center;
  color: #75a99d;
}

.matrix-detail {
  color: #afd8ce;
}

.matrix-detail h2 {
  color: #f5d76e;
  font-size: 34px;
}

.matrix-detail h3 {
  color: #d7fff3;
  font-size: 16px;
  margin-bottom: 16px;
}

@media (max-width: 980px) {
  .matrix-layout {
    grid-template-columns: 1fr;
  }

  .matrix-stage {
    min-height: 520px;
  }
}
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS.

---

### Task 4: Detail Panel and Relationship Lists

**Files:**
- Modify: `app/matrix/matrix-view.tsx`

- [ ] **Step 1: Add relationship derivation**

In `app/matrix/matrix-view.tsx`, add:

```tsx
const selectedLinks = useMemo(
  () =>
    selectedNode
      ? visibleLinks.filter((link) => link.source.ticker === selectedNode.ticker || link.target.ticker === selectedNode.ticker)
      : [],
  [selectedNode, visibleLinks]
);
```

- [ ] **Step 2: Replace selected detail markup**

Replace the `selectedNode ? (...)` block inside `.matrix-detail` with:

```tsx
{selectedNode ? (
  <>
    <p className="matrix-kicker">{layerLabel(layers, selectedNode.primaryLayer)}</p>
    <h2>{selectedNode.ticker}</h2>
    <h3>{selectedNode.name}</h3>
    <p>{selectedNode.thesis}</p>
    <p>Role: {selectedNode.role}</p>
    <div className="matrix-tag-list">
      {selectedNode.narratives.map((narrative) => (
        <span key={narrative}>{narrativeLabels[narrative]}</span>
      ))}
    </div>
    <div className="matrix-link-list">
      <h4>Direct links</h4>
      {selectedLinks.length > 0 ? (
        selectedLinks.map((link) => {
          const other = link.source.ticker === selectedNode.ticker ? link.target : link.source;
          return (
            <button className="matrix-link-row" key={`${link.source.ticker}-${link.target.ticker}-${link.role}`} type="button" onClick={() => setSelectedTicker(other.ticker)}>
              <span>{other.ticker}</span>
              <small>{link.strength} / {link.role}</small>
              <p>{link.thesis}</p>
            </button>
          );
        })
      ) : (
        <p>No direct visible links under current filters.</p>
      )}
    </div>
  </>
) : (
  <>
    <p className="matrix-kicker">No node selected</p>
    <h2>选择一个公司节点</h2>
    <p>点击 3D 场景里的公司节点后，这里会显示它的层级、叙事和直接依赖关系。</p>
  </>
)}
```

- [ ] **Step 3: Add detail CSS**

Append to `app/globals.css`:

```css
.matrix-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0;
}

.matrix-tag-list span {
  border: 1px solid rgba(85, 214, 190, 0.38);
  color: #9be7d8;
  font-size: 12px;
  padding: 4px 7px;
}

.matrix-link-list {
  display: grid;
  gap: 8px;
  margin-top: 18px;
}

.matrix-link-list h4 {
  color: #d7fff3;
  font-size: 13px;
  margin: 0;
}

.matrix-link-row {
  border: 1px solid rgba(117, 169, 157, 0.28);
  background: rgba(7, 16, 17, 0.68);
  color: #d7fff3;
  cursor: pointer;
  display: grid;
  gap: 3px;
  padding: 9px;
  text-align: left;
}

.matrix-link-row span {
  color: #f5d76e;
  font-weight: 700;
}

.matrix-link-row small {
  color: #75a99d;
}

.matrix-link-row p {
  margin: 0;
}
```

- [ ] **Step 4: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS.

---

### Task 5: Verification

**Files:**
- No new files.

- [ ] **Step 1: Run company matrix tests**

Run:

```bash
node --import tsx --test tests/company-matrix.test.ts
```

Expected: PASS.

- [ ] **Step 2: Run full local test suite**

Run:

```bash
node --import tsx --test tests/*.test.ts lib/*.test.ts
```

Expected: PASS.

- [ ] **Step 3: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [ ] **Step 4: Run production build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 5: Start dev server and verify `/matrix`**

Run:

```bash
npm run dev
```

Expected: Next.js reports a local URL. Open `/matrix` in the browser or verify HTML returns:

```bash
curl -sS --max-time 10 http://localhost:3000/matrix | head -c 300
```

Expected: HTML contains the matrix page.

- [ ] **Step 6: Browser visual verification**

Use Playwright or the available browser tool to verify:

- desktop `/matrix` canvas is nonblank
- mobile `/matrix` layout does not overlap
- clicking a node updates the detail panel
- filters change visible count or visible graph

---

## Self-Review

Spec coverage:

- `/matrix` route: Task 2.
- Static company graph: Task 1.
- 3D pyramid scene: Task 3.
- Company links and strengths: Task 1 and Task 3.
- Clickable node detail panel: Task 3 and Task 4.
- Filters by narrative/layer/link strength: Task 2 and Task 3.
- Unknown link handling: Task 1.
- No live prices/database: preserved by static data and no API additions.

Placeholder scan:

- No `TBD`, `TODO`, or "implement later" placeholders.
- The only future work is outside the implementation tasks and belongs to the original spec's future extensions.

Type consistency:

- `CompanyRole` is distinct from `LinkRole`.
- `hedges` is only a link role; company roles use `constraint variable` for `NEM` and `XOM`.
- `CompanyMatrixFilters` is used consistently by model helpers and UI state.
