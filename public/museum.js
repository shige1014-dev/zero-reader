const FORCE_META = [
  { key: 'physical', label: '物理', angle: -90 },
  { key: 'regMismatch', label: '监管', angle: -18 },
  { key: 'demand', label: '需求', angle: 54 },
  { key: 'capital', label: '资本', angle: 126 },
  { key: 'closure', label: '瓶颈', angle: 198 },
];

const ERA_ICON = {
  industrial: '⚙',
  compute: '⌘',
  network: '🕸',
  data: '📊',
  ai: '🧠',
  posthuman: '🚀',
};

const RANK_STYLE = {
  'SS+': { color: 'var(--rank-ssplus)', border: 'rgba(201,168,76,0.34)' },
  'SS': { color: 'var(--rank-ss)', border: 'rgba(185,189,200,0.22)' },
  'S': { color: 'var(--rank-s)', border: 'rgba(182,122,60,0.22)' },
  'paradigm-bet': { color: 'var(--rank-bet)', border: 'rgba(191,74,122,0.28)' },
};

const state = {
  filter: 'all',
  data: null,
};

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

function byId(id) {
  return document.getElementById(id);
}

function anglePoint(cx, cy, radius, angleDeg) {
  const rad = (Math.PI / 180) * angleDeg;
  return {
    x: cx + Math.cos(rad) * radius,
    y: cy + Math.sin(rad) * radius,
  };
}

function polygonPoints(radius, cx, cy, scale = 1) {
  return FORCE_META.map((axis) => {
    const point = anglePoint(cx, cy, radius * scale, axis.angle);
    return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  }).join(' ');
}

function radarSvg(forces, size = 80) {
  const radius = size * 0.28;
  const cx = size / 2;
  const cy = size / 2;
  const rings = [0.2, 0.4, 0.6, 0.8, 1];
  const dataPoints = FORCE_META.map((axis) => {
    const value = Math.max(0, Math.min(10, Number(forces?.[axis.key]) || 0));
    const scale = value / 10;
    const point = anglePoint(cx, cy, radius * scale, axis.angle);
    return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
  }).join(' ');

  const guides = rings.map((ring) =>
    `<polygon points="${polygonPoints(radius, cx, cy, ring)}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`
  ).join('');

  const axes = FORCE_META.map((axis) => {
    const edge = anglePoint(cx, cy, radius, axis.angle);
    const label = anglePoint(cx, cy, radius + 16, axis.angle);
    return `
      <line x1="${cx}" y1="${cy}" x2="${edge.x.toFixed(2)}" y2="${edge.y.toFixed(2)}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <text x="${label.x.toFixed(2)}" y="${label.y.toFixed(2)}" fill="var(--t3)" font-size="9" text-anchor="middle" dominant-baseline="middle">${axis.label}</text>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-label="五力雷达图">
      ${guides}
      ${axes}
      <polygon points="${dataPoints}" fill="rgba(201,168,76,0.18)" stroke="var(--gold)" stroke-width="1.5"/>
      ${FORCE_META.map((axis) => {
        const point = anglePoint(cx, cy, radius * ((Number(forces?.[axis.key]) || 0) / 10), axis.angle);
        return `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="2.2" fill="var(--gold)"/>`;
      }).join('')}
    </svg>
  `;
}

function companyCard(company, erasById) {
  const rank = RANK_STYLE[company.rank] || RANK_STYLE.S;
  return `
    <article class="museum-card company-card">
      <div class="card-head">
        <span class="rank-badge" style="color:${rank.color};border-color:${rank.border}">${esc(company.rank)}</span>
        <h3 class="card-title">${esc(company.name)}</h3>
      </div>
      <div class="era-badges">
        ${company.eraIds.map((eraId) => `
          <span class="era-badge">${ERA_ICON[eraId] || '◈'} ${esc(erasById[eraId]?.label || eraId)}</span>
        `).join('')}
      </div>
      <p class="card-one-line">“${esc(company.oneLine)}”</p>
      <div class="card-bottleneck"><span class="label">瓶颈</span><span>${esc(company.bottleneck)}</span></div>
      <div class="card-radar">${radarSvg(company.forces, 88)}</div>
    </article>
  `;
}

function prophecyCard(prophecy) {
  return `
    <article class="museum-card prophecy-card">
      <div class="card-head">
        <span class="prophecy-badge">🔮 预言</span>
        <h3 class="card-title">${esc(prophecy.substrate)}</h3>
      </div>
      <div class="prophecy-meta">
        <div><span class="label">触发指标</span><span>${esc(prophecy.trigger)}</span></div>
        <div><span class="label">瓶颈机制</span><span>${esc(prophecy.closureMechanism)}</span></div>
      </div>
      <div class="prophecy-radar">${radarSvg(prophecy.forces, 132)}</div>
      <div class="candidate-block">
        <div class="candidate-title">候选类型</div>
        <ul>
          ${prophecy.candidateTypes.map((item) => `<li><strong>${esc(item.type)}</strong><span>${esc(item.note)}</span></li>`).join('')}
        </ul>
      </div>
    </article>
  `;
}

function topLayout(data) {
  return `
    <style>
      .museum-shell{display:block;min-height:100vh}
      .museum-rail{position:sticky;top:0;height:100vh;border-right:1px solid var(--border);padding:20px 14px;display:flex;flex-direction:column;align-items:center;gap:18px;background:rgba(9,9,11,0.88);backdrop-filter:blur(20px)}
      .museum-rail-logo{width:42px;height:42px;border-radius:12px;border:1px solid var(--gold-line);display:grid;place-items:center;color:var(--gold);font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;letter-spacing:.08em}
      .museum-rail-pill{writing-mode:vertical-rl;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 0;border-radius:999px;border:1px solid var(--border);background:var(--card);font-size:11px;color:var(--t3);letter-spacing:.1em;min-height:132px}
      .museum-rail-link{margin-top:auto;width:100%;padding:12px 0;border-radius:12px;border:1px solid var(--gold-line);background:linear-gradient(180deg,rgba(201,168,76,0.08),rgba(20,20,22,0.92));text-align:center;color:var(--gold);font-size:11px;letter-spacing:.14em}
      .museum-main{padding:28px 28px 48px}
      .museum-top{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:18px}
      .museum-title{font-size:28px;line-height:1.1;font-weight:700;letter-spacing:-.02em}
      .museum-title .en{display:block;margin-top:8px;color:var(--t4);font-family:"JetBrains Mono",ui-monospace,monospace;font-size:13px;letter-spacing:.18em}
      .museum-stats{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
      .museum-stat{padding:10px 12px;border-radius:999px;border:1px solid var(--border);background:rgba(20,20,22,0.72);font-size:11px;color:var(--t3);letter-spacing:.08em}
      .museum-stat strong{color:var(--gold);font-family:"JetBrains Mono",ui-monospace,monospace}
      .chip-row{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 28px}
      .museum-chip{height:32px;padding:0 14px;border-radius:999px;border:1px solid var(--border);background:rgba(20,20,22,0.72);color:var(--t3);font-size:12px;letter-spacing:.06em;cursor:pointer}
      .museum-chip.active{border-color:var(--gold-line);background:var(--gold-soft);color:var(--gold)}
      .museum-chip.prophecy{border-style:dashed}
      .era-section{margin-bottom:28px}
      .era-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--border)}
      .era-title{font-size:19px;color:var(--t1)}
      .era-period{display:block;margin-top:6px;color:var(--t4);font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.1em}
      .era-core{font-size:13px;color:var(--gold);max-width:380px;text-align:right}
      .museum-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
      .museum-grid.prophecy-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
      .museum-card{border-radius:16px;border:1px solid var(--border);background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01)),var(--card-elev);padding:18px 18px 16px;box-shadow:0 18px 40px rgba(0,0,0,0.22)}
      .company-card:hover{border-color:var(--border-strong);transform:translateY(-1px)}
      .prophecy-card{background:linear-gradient(135deg,rgba(201,168,76,0.06),transparent),var(--card-elev);border-style:dashed}
      .card-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
      .card-title{margin:0;font-size:20px;font-weight:600}
      .rank-badge,.prophecy-badge{display:inline-flex;align-items:center;height:28px;padding:0 10px;border-radius:999px;border:1px solid var(--border);font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.08em}
      .prophecy-badge{color:var(--gold);border-color:var(--gold-line)}
      .era-badges{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
      .era-badge{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 9px;border-radius:999px;background:rgba(255,255,255,0.04);color:var(--t3);font-size:11px;letter-spacing:.05em}
      .card-one-line{margin:0 0 14px;color:var(--t2);font-size:15px;line-height:1.7}
      .card-bottleneck,.prophecy-meta div{display:grid;gap:6px;margin-bottom:14px}
      .label{color:var(--t4);font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
      .card-radar,.prophecy-radar{display:flex;justify-content:center;padding-top:6px}
      .candidate-block{margin-top:10px;padding-top:12px;border-top:1px solid var(--border)}
      .candidate-title{margin-bottom:10px;color:var(--gold);font-size:12px;letter-spacing:.12em;text-transform:uppercase}
      .candidate-block ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}
      .candidate-block li{display:grid;gap:4px;color:var(--t2);font-size:13px;line-height:1.6}
      .candidate-block strong{color:var(--t1);font-size:13px}
      .museum-empty{padding:22px;border-radius:16px;border:1px dashed var(--border-strong);color:var(--t3)}
      @media (max-width: 1100px){
        .museum-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
      }
      @media (max-width: 880px){
        .museum-shell{grid-template-columns:1fr}
        .museum-rail{position:relative;height:auto;flex-direction:row;justify-content:space-between;padding:14px 18px}
        .museum-rail-pill{writing-mode:horizontal-tb;min-height:auto;padding:8px 12px}
        .museum-main{padding:18px}
        .museum-top,.era-head{display:grid}
        .museum-grid,.museum-grid.prophecy-grid{grid-template-columns:1fr}
        .era-core{text-align:left}
      }
    </style>
    <div class="museum-shell">
      <div class="museum-main">
        <header class="museum-top">
          <div class="museum-head-copy">
            <div class="museum-title">博物馆 · MUSEUM 2076<span class="en">CIVILIZATION CONTROL ATLAS</span></div>
          </div>
          <div class="museum-stats">
            <div class="museum-stat">已记录 <strong>${data.companies.length}</strong></div>
            <div class="museum-stat">预言 <strong>${data.prophecies.length}</strong></div>
            <div class="museum-stat">时代 <strong>${data.eras.length}</strong></div>
          </div>
        </header>
        <div class="chip-row" id="museumChips"></div>
        <div id="museumSections"></div>
      </div>
    </div>
  `;
}

function renderChips(data) {
  const chips = [
    { id: 'all', label: '全部' },
    ...data.eras.map((era) => ({ id: era.id, label: era.label })),
    { id: 'prophecy', label: '预言时代 🔮', prophecy: true },
  ];
  byId('museumChips').innerHTML = chips.map((chip) => `
    <button class="museum-chip ${chip.prophecy ? 'prophecy' : ''} ${state.filter === chip.id ? 'active' : ''}" data-chip="${chip.id}">
      ${esc(chip.label)}
    </button>
  `).join('');

  document.querySelectorAll('[data-chip]').forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.chip || 'all';
      renderSections();
      renderChips(state.data);
    });
  });
}

function renderSections() {
  const data = state.data;
  const erasById = Object.fromEntries(data.eras.map((era) => [era.id, era]));
  const sections = [];

  if (state.filter !== 'prophecy') {
    const targetEras = state.filter === 'all'
      ? data.eras
      : data.eras.filter((era) => era.id === state.filter);

    for (const era of targetEras) {
      const companies = data.companies.filter((company) => company.eraIds.includes(era.id));
      if (companies.length === 0) continue;
      sections.push(`
        <section class="era-section">
          <div class="era-head">
            <div>
              <h2 class="era-title">${esc(era.label)}<span class="era-period">${esc(era.period)}</span></h2>
            </div>
            <div class="era-core">${esc(era.core)}</div>
          </div>
          <div class="museum-grid">
            ${companies.map((company) => companyCard(company, erasById)).join('')}
          </div>
        </section>
      `);
    }
  }

  if (state.filter === 'all' || state.filter === 'prophecy') {
    sections.push(`
      <section class="era-section">
        <div class="era-head">
          <div>
            <h2 class="era-title">预言时代<span class="era-period">NOT YET CLOSED</span></h2>
          </div>
          <div class="era-core">五力已经形成，但封闭性还没真正锁死</div>
        </div>
        <div class="museum-grid prophecy-grid">
          ${data.prophecies.map((prophecy) => prophecyCard(prophecy)).join('')}
        </div>
      </section>
    `);
  }

  byId('museumSections').innerHTML = sections.length
    ? sections.join('')
    : '<div class="museum-empty">当前筛选下没有可展示的文明样本。</div>';
}

async function boot() {
  const root = byId('museumRoot');
  root.innerHTML = '<div style="padding:40px;color:var(--t3)">MUSEUM 2076 正在装载…</div>';
  try {
    const response = await fetch('/museum.json');
    if (!response.ok) {
      throw new Error(`museum ${response.status}`);
    }
    const data = await response.json();
    state.data = data;
    root.innerHTML = topLayout(data);
    renderChips(data);
    renderSections();
  } catch (error) {
    root.innerHTML = `
      <div style="padding:40px">
        <h1 style="margin:0 0 10px;color:var(--gold)">文明博物馆加载失败</h1>
        <p style="color:var(--t3);line-height:1.8">${esc(error?.message || 'unknown error')}</p>
      </div>
    `;
  }
}

boot();
