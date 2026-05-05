import fs from "node:fs";
import path from "node:path";
import memorialModule from "../lib/memorials.ts";

const { MEMORIAL_ENTRIES } = memorialModule;

const outDir = path.join(process.cwd(), "public", "memorials", "generated");
fs.mkdirSync(outDir, { recursive: true });

const generatedEntries = MEMORIAL_ENTRIES.filter((entry) =>
  entry.image?.startsWith("/memorials/generated/")
);

const palettes = {
  archive: {
    bg0: "#050912",
    bg1: "#0a1724",
    bg2: "#111f2a",
    gold: "#d8b27a",
    softGold: "#f1d7a2",
    ink: "#e8dcc7",
    blue: "#76c8e8",
    glass: "rgba(126, 192, 224, 0.18)"
  },
  dream: {
    bg0: "#050614",
    bg1: "#111632",
    bg2: "#24153c",
    gold: "#e2bd84",
    softGold: "#ffe1a6",
    ink: "#f0e4d0",
    blue: "#95d8ff",
    violet: "#a98bff",
    glass: "rgba(169, 139, 255, 0.22)"
  }
};

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(value, size) {
  const chars = [...String(value)];
  const lines = [];
  for (let index = 0; index < chars.length; index += size) {
    lines.push(chars.slice(index, index + size).join(""));
  }
  return lines;
}

function wrapTitle(value, maxUnits) {
  const tokens = String(value).match(/[A-Za-z0-9._-]+|[\u4e00-\u9fff]|[^\sA-Za-z0-9._-\u4e00-\u9fff]/gu) ?? [];
  const lines = [];
  let line = "";
  let units = 0;

  for (const token of tokens) {
    const tokenUnits = /^[A-Za-z0-9._-]+$/.test(token) ? token.length * 0.56 : 1;
    const needsSpace = line && /^[A-Za-z0-9._-]+$/.test(token) && /[A-Za-z0-9._-]$/.test(line);
    const nextUnits = units + tokenUnits + (needsSpace ? 0.5 : 0);

    if (line && nextUnits > maxUnits) {
      lines.push(line);
      line = token;
      units = tokenUnits;
    } else {
      line += `${needsSpace ? " " : ""}${token}`;
      units = nextUnits;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function lines(text, x, y, size, gap, attrs = "") {
  return wrap(text, size)
    .map((line, index) => `<text x="${x}" y="${y + index * gap}" ${attrs}>${xml(line)}</text>`)
    .join("\n");
}

function miniCards(count, y, palette, mode) {
  return Array.from({ length: count }, (_, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = 566 + col * 116;
    const yy = y + row * 130;
    const hue = mode === "dream" ? palette.violet : palette.blue;
    return `
      <g opacity="${0.72 - row * 0.07}">
        <rect x="${x}" y="${yy}" width="92" height="112" rx="8" fill="rgba(255,255,255,0.045)" stroke="${palette.gold}" stroke-opacity=".45"/>
        <path d="M${x + 12} ${yy + 80} C${x + 30} ${yy + 38}, ${x + 55} ${yy + 128}, ${x + 80} ${yy + 34}" fill="none" stroke="${hue}" stroke-opacity=".52"/>
        <circle cx="${x + 34}" cy="${yy + 42}" r="${12 + (index % 2) * 4}" fill="${hue}" opacity=".18"/>
        <path d="M${x + 14} ${yy + 92} H${x + 78}" stroke="${palette.gold}" stroke-opacity=".45"/>
      </g>`;
  }).join("\n");
}

function archiveScene(entry, palette) {
  if (entry.collection === "photo-stock") {
    return `
      <g transform="translate(0 22)">
        <rect x="90" y="785" width="840" height="410" rx="18" fill="rgba(255,255,255,0.035)" stroke="${palette.gold}" stroke-opacity=".35"/>
        <rect x="140" y="842" width="250" height="310" rx="10" fill="#08111b" stroke="${palette.gold}" stroke-opacity=".55"/>
        <text x="166" y="890" class="small" fill="${palette.softGold}">CONTACT SHEET</text>
        ${Array.from({ length: 15 }, (_, i) => {
          const x = 166 + (i % 3) * 66;
          const y = 922 + Math.floor(i / 3) * 42;
          return `<rect x="${x}" y="${y}" width="48" height="30" rx="3" fill="url(#thumb${i % 4})" stroke="${palette.gold}" stroke-opacity=".28"/>`;
        }).join("\n")}
        <rect x="440" y="835" width="175" height="288" rx="8" fill="rgba(255,255,255,0.055)" stroke="${palette.blue}" stroke-opacity=".45"/>
        <rect x="642" y="835" width="175" height="288" rx="8" fill="rgba(255,255,255,0.055)" stroke="${palette.gold}" stroke-opacity=".42"/>
        <rect x="682" y="886" width="96" height="140" rx="5" fill="#0f1b25" stroke="${palette.gold}" stroke-opacity=".5"/>
        <path d="M476 1020 H582 M476 1048 H570 M476 1076 H548" stroke="${palette.gold}" stroke-opacity=".52"/>
        ${miniCards(6, 460, palette, "archive")}
      </g>`;
  }

  if (entry.collection === "future-world") {
    return `
      <g transform="translate(0 18)">
        <path d="M82 1010 C210 840, 315 860, 430 710 C560 540, 668 640, 925 435 L925 1190 L82 1190 Z" fill="url(#cityGlow)" opacity=".8"/>
        <g stroke="${palette.gold}" stroke-opacity=".45" fill="rgba(255,255,255,0.05)">
          <rect x="130" y="850" width="92" height="245"/>
          <rect x="246" y="768" width="78" height="327"/>
          <rect x="350" y="690" width="118" height="405"/>
          <rect x="520" y="760" width="92" height="335"/>
          <rect x="654" y="620" width="118" height="475"/>
          <rect x="806" y="792" width="86" height="303"/>
        </g>
        <path d="M95 1040 C285 972, 412 946, 566 990 C690 1025, 792 1004, 930 900" fill="none" stroke="${palette.blue}" stroke-width="6" stroke-opacity=".55"/>
        <path d="M126 1148 H880" stroke="${palette.gold}" stroke-opacity=".32"/>
        <rect x="88" y="660" width="270" height="210" rx="15" fill="rgba(7,20,32,0.62)" stroke="${palette.blue}" stroke-opacity=".65"/>
        <text x="118" y="706" class="small" fill="${palette.softGold}">SYSTEMS OVERVIEW</text>
        <path d="M138 790 C178 730, 218 850, 272 760 C304 708, 326 788, 340 742" fill="none" stroke="${palette.blue}" stroke-opacity=".68"/>
        <rect x="626" y="536" width="286" height="190" rx="15" fill="rgba(7,20,32,0.56)" stroke="${palette.gold}" stroke-opacity=".56"/>
        <path d="M675 654 L730 590 L812 612 L860 572" fill="none" stroke="${palette.gold}" stroke-opacity=".62"/>
      </g>`;
  }

  return `
    <g transform="translate(0 10)">
      <rect x="72" y="802" width="880" height="410" rx="18" fill="rgba(255,255,255,0.035)" stroke="${palette.gold}" stroke-opacity=".36"/>
      <path d="M88 1115 C254 1024, 416 1020, 548 1078 C688 1139, 800 1112, 944 1030 L944 1210 L88 1210 Z" fill="rgba(232,220,199,.82)" opacity=".86"/>
      <path d="M121 915 H392 M121 958 H352 M121 1001 H374 M121 1044 H320" stroke="#1a2430" stroke-opacity=".48"/>
      <rect x="520" y="844" width="330" height="245" rx="14" fill="rgba(5,14,23,0.8)" stroke="${palette.blue}" stroke-opacity=".58"/>
      <text x="548" y="890" class="small" fill="${palette.softGold}">RUNNING...</text>
      <rect x="550" y="930" width="96" height="106" rx="8" fill="rgba(255,255,255,.04)" stroke="${palette.gold}" stroke-opacity=".42"/>
      <rect x="676" y="930" width="142" height="106" rx="8" fill="rgba(118,200,232,.12)" stroke="${palette.blue}" stroke-opacity=".52"/>
      <path d="M118 858 C235 818, 356 824, 460 862" stroke="${palette.gold}" stroke-opacity=".55" fill="none"/>
      <path d="M702 1012 C730 974, 752 990, 780 946" stroke="${palette.blue}" stroke-opacity=".72" fill="none"/>
      ${miniCards(4, 500, palette, "archive")}
    </g>`;
}

function dreamScene(entry, palette) {
  const title = entry.title;
  const whale = title.includes("鲸");
  const clock = title.includes("钟");
  const door = title.includes("门");
  const forge = title.includes("锻造");

  return `
    <g opacity=".92">
      <circle cx="760" cy="360" r="118" fill="url(#dreamOrb)" opacity=".72"/>
      <circle cx="805" cy="332" r="54" fill="none" stroke="${palette.softGold}" stroke-opacity=".45"/>
      <path d="M130 1040 C250 842, 450 820, 560 650 C672 476, 780 492, 944 338" fill="none" stroke="${palette.blue}" stroke-width="8" stroke-opacity=".55"/>
      <path d="M116 1056 C280 906, 456 900, 612 770 C738 665, 832 552, 948 462" fill="none" stroke="${palette.gold}" stroke-width="2" stroke-opacity=".62"/>
      ${
        whale
          ? `<path d="M470 560 C642 408, 874 420, 940 548 C860 648, 655 685, 492 612 C432 680, 372 682, 325 620 C378 622, 430 596, 470 560 Z" fill="url(#crystal)" stroke="${palette.blue}" stroke-opacity=".78"/>
             <circle cx="846" cy="535" r="7" fill="${palette.softGold}"/>`
          : clock
            ? `<circle cx="720" cy="560" r="176" fill="url(#crystal)" stroke="${palette.blue}" stroke-opacity=".72"/>
               <path d="M720 410 V560 L830 638" stroke="${palette.softGold}" stroke-width="5" stroke-linecap="round"/>
               <path d="M578 610 C660 700, 760 444, 868 592" fill="none" stroke="${palette.violet}" stroke-width="7" stroke-opacity=".52"/>`
            : door
              ? `<g stroke="${palette.gold}" stroke-opacity=".64" fill="rgba(255,255,255,.045)">
                   <rect x="570" y="458" width="120" height="250" rx="8"/>
                   <rect x="722" y="406" width="138" height="302" rx="8"/>
                   <path d="M590 640 C622 606, 658 612, 688 642 M744 584 C784 536, 826 540, 858 586" stroke="${palette.blue}" fill="none"/>
                 </g>`
              : forge
                ? `<path d="M575 652 L846 520 L874 594 L604 730 Z" fill="rgba(255,255,255,.06)" stroke="${palette.gold}" stroke-opacity=".68"/>
                   <circle cx="722" cy="612" r="86" fill="url(#dreamOrb)" opacity=".76"/>
                   <path d="M632 702 L844 492" stroke="${palette.softGold}" stroke-width="9" stroke-linecap="round"/>`
                : `<path d="M560 675 C640 520, 802 508, 878 632 C770 708, 690 760, 560 675 Z" fill="url(#crystal)" stroke="${palette.blue}" stroke-opacity=".72"/>
                   <path d="M494 820 C570 690, 708 700, 770 806 C660 870, 560 902, 494 820 Z" fill="url(#crystal)" opacity=".72" stroke="${palette.violet}" stroke-opacity=".62"/>`
      }
      <g transform="translate(150 785)">
        <rect x="0" y="0" width="250" height="280" rx="130" fill="rgba(255,255,255,.04)" stroke="${palette.gold}" stroke-opacity=".5"/>
        <path d="M55 220 C88 120, 148 118, 196 52" fill="none" stroke="${palette.blue}" stroke-opacity=".56"/>
        <path d="M70 184 C116 164, 132 104, 178 88" fill="none" stroke="${palette.violet}" stroke-opacity=".54"/>
      </g>
      ${Array.from({ length: 38 }, (_, i) => {
        const x = 70 + ((i * 83) % 880);
        const y = 110 + ((i * 127) % 1020);
        const r = 1.5 + (i % 4);
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 3 ? palette.blue : palette.softGold}" opacity="${0.24 + (i % 5) * 0.09}"/>`;
      }).join("\n")}
    </g>`;
}

function cover(entry, index) {
  const mode = entry.collection === "imagination" ? "dream" : "archive";
  const palette = palettes[mode];
  const collectionLabel = {
    workflow: "WORKFLOW ARCHIVE",
    "photo-stock": "IMAGE STOCK",
    "future-world": "FUTURE WORLD",
    imagination: "WILD IMAGINATION"
  }[entry.collection];
  const titleLines = wrapTitle(entry.title, entry.collection === "imagination" ? 5.4 : 7.2);
  const themeLines = wrap(entry.theme, 16);
  const briefLines = wrap(entry.posterBrief, 18).slice(0, 4);
  const scene = mode === "dream" ? dreamScene(entry, palette) : archiveScene(entry, palette);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536" viewBox="0 0 1024 1536" role="img" aria-labelledby="title desc">
  <title id="title">${xml(entry.title)}</title>
  <desc id="desc">${xml(entry.posterBrief)}</desc>
  <defs>
    <radialGradient id="bg" cx="${mode === "dream" ? "72%" : "62%"}" cy="34%" r="78%">
      <stop offset="0" stop-color="${palette.bg2}"/>
      <stop offset=".48" stop-color="${palette.bg1}"/>
      <stop offset="1" stop-color="${palette.bg0}"/>
    </radialGradient>
    <linearGradient id="paper" x1="0" x2="1">
      <stop offset="0" stop-color="#e8dcc7"/>
      <stop offset=".58" stop-color="#bfa985"/>
      <stop offset="1" stop-color="#6b5840"/>
    </linearGradient>
    <linearGradient id="cityGlow" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${palette.blue}" stop-opacity=".34"/>
      <stop offset=".55" stop-color="${palette.gold}" stop-opacity=".18"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".04"/>
    </linearGradient>
    <radialGradient id="dreamOrb" cx="48%" cy="45%" r="60%">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".82"/>
      <stop offset=".38" stop-color="${palette.blue}" stop-opacity=".55"/>
      <stop offset=".72" stop-color="${mode === "dream" ? palette.violet : palette.gold}" stop-opacity=".35"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="crystal" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".52"/>
      <stop offset=".45" stop-color="${palette.blue}" stop-opacity=".34"/>
      <stop offset="1" stop-color="${mode === "dream" ? palette.violet : palette.gold}" stop-opacity=".3"/>
    </linearGradient>
    ${[0, 1, 2, 3].map((i) => `
    <linearGradient id="thumb${i}" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${i % 2 ? palette.bg2 : palette.bg1}"/>
      <stop offset=".62" stop-color="${i % 2 ? palette.gold : palette.blue}" stop-opacity=".45"/>
      <stop offset="1" stop-color="${palette.bg0}"/>
    </linearGradient>`).join("\n")}
    <filter id="softGlow"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <style>
      .serif{font-family:"Songti SC","Noto Serif CJK SC","STSong",serif}
      .sans{font-family:"Inter","Avenir Next","Helvetica Neue",Arial,sans-serif}
      .title{font-size:${titleLines.length > 2 ? 88 : 112}px;font-weight:700;letter-spacing:5px;fill:url(#paper)}
      .small{font-family:"Inter","Avenir Next",Arial,sans-serif;font-size:18px;letter-spacing:5px}
      .micro{font-family:"Inter","Avenir Next",Arial,sans-serif;font-size:13px;letter-spacing:3px}
      .body{font-family:"Songti SC","Noto Serif CJK SC",serif;font-size:24px;letter-spacing:3px}
    </style>
  </defs>
  <rect width="1024" height="1536" fill="url(#bg)"/>
  <rect x="14" y="14" width="996" height="1508" fill="none" stroke="${palette.gold}" stroke-opacity=".44"/>
  <path d="M36 36 H178 M846 36 H988 M36 1500 H178 M846 1500 H988" stroke="${palette.gold}" stroke-opacity=".58"/>
  <path d="M512 30 v64 M512 1442 v64" stroke="${palette.gold}" stroke-opacity=".25"/>
  <circle cx="512" cy="74" r="24" fill="none" stroke="${palette.gold}" stroke-opacity=".55"/>
  <text x="52" y="86" class="small" fill="${palette.softGold}">ZERO 2076</text>
  <text x="790" y="86" class="small" fill="${palette.softGold}" text-anchor="end">${xml(collectionLabel)}</text>
  <text x="52" y="126" class="micro" fill="${palette.gold}" opacity=".76">PERSONAL ARCHIVE · MEMORIAL SERIES</text>

  <g transform="translate(52 170)">
    ${titleLines.map((line, i) => `<text x="0" y="${i * 124}" class="title serif">${xml(line)}</text>`).join("\n")}
    <text x="0" y="${titleLines.length * 124 + 40}" class="small" fill="${palette.gold}">${xml(collectionLabel)} · 2026-05-02</text>
    ${themeLines.map((line, i) => `<text x="0" y="${titleLines.length * 124 + 104 + i * 36}" class="body" fill="${palette.ink}" opacity=".9">${xml(line)}</text>`).join("\n")}
  </g>

  <g opacity=".9">
    ${scene}
  </g>

  <g transform="translate(52 1262)">
    <rect x="0" y="0" width="920" height="168" rx="18" fill="rgba(0,0,0,.28)" stroke="${palette.gold}" stroke-opacity=".5"/>
    <path d="M305 24 V144 M622 24 V144" stroke="${palette.gold}" stroke-opacity=".36"/>
    <text x="32" y="48" class="micro" fill="${palette.softGold}">TODAY'S NOTE</text>
    ${briefLines.map((line, i) => `<text x="32" y="${88 + i * 27}" class="body" fill="${palette.ink}" opacity=".86">${xml(line)}</text>`).join("\n")}
    <text x="340" y="48" class="micro" fill="${palette.softGold}">STATUS</text>
    <text x="340" y="96" class="body" fill="${palette.gold}">可做海报</text>
    <text x="660" y="48" class="micro" fill="${palette.softGold}">CARD</text>
    <text x="660" y="98" class="small" fill="${palette.gold}">NO.${String(index + 11).padStart(3, "0")}</text>
  </g>

  <text x="52" y="1486" class="micro" fill="${palette.gold}" opacity=".72">© ZERO 2076</text>
  <text x="512" y="1486" class="micro" fill="${palette.gold}" opacity=".72" text-anchor="middle">BUILDING THE LONG-TERM FUTURE</text>
  <text x="972" y="1486" class="micro" fill="${palette.gold}" opacity=".72" text-anchor="end">MEMORIAL CARD</text>
</svg>`;
}

for (const [index, entry] of generatedEntries.entries()) {
  fs.writeFileSync(path.join(outDir, `${entry.date}.svg`), cover(entry, index));
}

console.log(`Generated ${generatedEntries.length} memorial covers in ${outDir}`);
