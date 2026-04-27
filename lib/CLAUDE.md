# lib

## Ingestion Source Rules
- When adding a new source to `lib/ingest.ts`, wire both the fetch call and the post-fetch allowlist. Source items must pass `isAllowedIngestItem()` after URL/title/recency checks or they will be collected from the network and then dropped before analysis and insert.
- Curated source lists such as `newsnow` and `x-twitter` are allowed by `sourceType`; general RSS/API sources remain constrained by explicit source-name allowlists.
