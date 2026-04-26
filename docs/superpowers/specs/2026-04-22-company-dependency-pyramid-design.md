# Company Dependency Pyramid Design

## Goal

Build a 3D visual model for US stocks that shows how major companies sit inside a future-facing dependency structure. The model should not be a simple sector map. It should show layered dependencies, cross-layer links, and how one company can participate in several narratives at once.

The first version lives inside `zerozero-reader` as a new route:

```text
/matrix
```

Working title:

```text
文明产业金字塔
```

## Core Idea

The pyramid represents "what the future story depends on."

Top layers are outcomes and applications. Lower layers are increasingly foundational: software, compute, manufacturing, energy, materials, capital, policy, and geopolitical constraints.

Companies are 3D nodes placed on their primary layer, but they can link across layers. A company should not be locked to one sector. For example:

- `TSLA`: application, automation, energy storage
- `GOOGL`: application, model, cloud, custom chips
- `AMZN`: application, cloud, logistics infrastructure
- `AVGO`: compute networking, custom silicon, software cash flow
- `GEV`: energy equipment, grid bottleneck, industrial cycle

## Pyramid Layers

Layer 1: Future Narratives

- AI agents
- energy reconstruction
- defense autonomy
- space infrastructure
- automated production
- financial/data intelligence

Layer 2: Application Layer

- `MSFT`
- `GOOGL`
- `META`
- `AMZN`
- `TSLA`
- `PLTR`
- `APP`
- `NOW`

Layer 3: Software / Data / Cloud Layer

- `SNOW`
- `CRM`
- `ORCL`
- `MDB`
- `DDOG`
- `NET`
- `CRWD`
- `PANW`

Layer 4: Compute Layer

- `NVDA`
- `AMD`
- `AVGO`
- `ANET`
- `MRVL`
- `SMCI`
- `DELL`
- `MU`

Layer 5: Manufacturing / Equipment / Design Layer

- `TSM`
- `ASML`
- `AMAT`
- `LRCX`
- `KLAC`
- `SNPS`
- `CDNS`
- `ARM`

Layer 6: Energy / Materials / Physical Infrastructure Layer

- `CEG`
- `VST`
- `CCJ`
- `ETN`
- `PWR`
- `GEV`
- `NEM`
- `FCX`

Layer 7: Capital / Defense / Geopolitical Constraint Layer

- `JPM`
- `GS`
- `LMT`
- `RTX`
- `NOC`
- `BA`
- `CAT`
- `XOM`

## Links

Each link connects two companies and explains a dependency or relationship.

Link strengths:

- `core`: direct dependency, thick bright line
- `strong`: important but not singular dependency
- `weak`: related narrative or indirect beneficiary

Link roles:

- `supplies`
- `depends_on`
- `competes_with`
- `enables`
- `constrains`
- `finances`
- `hedges`

Example links:

- `NVDA -> TSM`: core manufacturing dependency
- `TSM -> ASML`: lithography equipment dependency
- `MSFT -> NVDA`: AI compute demand
- `AMZN -> ANET`: cloud networking dependency
- `GOOGL -> AVGO`: custom silicon and networking relationship
- `CEG -> MSFT`: energy supply and data center constraint
- `LMT -> RTX`: defense supply chain / peer cluster
- `PLTR -> LMT`: defense data and software relationship

## Node Model

Each company node contains:

- ticker
- company name
- primary layer
- secondary layer memberships
- narratives
- role: `core dependency`, `second-order beneficiary`, `constraint variable`, or `narrative spillover`
- short thesis
- links to related companies

The first version uses static data in a local TypeScript file. It does not fetch live prices.

## User Experience

The `/matrix` page opens directly into a full-viewport 3D scene.

Primary interactions:

- rotate, pan, and zoom the 3D pyramid
- hover a node to highlight that company and its direct links
- click a node to open a compact side panel
- filter by narrative
- filter by layer
- toggle link strengths
- reset camera

The side panel shows:

- ticker and company name
- layer and role
- narratives
- direct dependencies
- direct beneficiaries
- why this node matters

## Visual Direction

The visual should feel like an analytical terminal, not a marketing hero.

Use:

- dark but not purely black background
- restrained grid/floor
- pyramid layers as translucent horizontal slabs
- company nodes as small glowing markers with ticker labels
- link colors by strength
- subtle camera motion only if it does not reduce readability

Avoid:

- decorative gradient blobs
- oversized landing-page text
- card-heavy marketing layout
- fake real-time data
- one-color purple/blue dominance

## Technical Design

Route:

```text
app/matrix/page.tsx
```

Client component:

```text
app/matrix/matrix-view.tsx
```

Static data:

```text
lib/company-matrix/data.ts
```

Pure helpers:

```text
lib/company-matrix/model.ts
```

Rendering:

- Use Three.js for the 3D scene.
- Use React state for selected node and filters.
- Keep the first version static and deterministic.
- Do not add a database or live market data in v1.

## Error Handling

Because v1 uses static data, runtime failure risk is mostly rendering-related.

The page should:

- show an empty-state message if filters hide all nodes
- keep the side panel closed when no node is selected
- tolerate missing optional fields in company data
- avoid crashing when a link references an unknown ticker; such links should be ignored by the renderer

## Testing

Unit tests:

- company matrix data has unique tickers
- links reference known tickers
- filtering by narrative returns expected nodes
- filtering by layer returns expected nodes
- unknown links are excluded from renderable link output

Manual verification:

- run `npm run typecheck`
- run `npm run build`
- start local dev server
- check `/matrix` in browser
- verify desktop and mobile screenshots
- verify the Three.js canvas is nonblank
- verify hover/click/filter interactions

## Non-Goals

- No live price feed in v1.
- No portfolio weighting in v1.
- No database schema changes.
- No editable graph UI.
- No investment advice language.
- No automatic company scoring.
- No full-market coverage.

## Future Extensions

After v1 works:

- add price and performance overlays
- add news heat from zerozero-reader article tags
- add personal watchlist layers
- add "dependency shock" mode, such as energy shortage or export controls
- add timeline view to show how companies move between layers
