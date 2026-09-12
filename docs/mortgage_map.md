# Mortgage Map

On September 12, 2026, Jingheng explicitly requested a public interactive knowledge map in a real Portfolio section. This is a separate educational reading project. The withdrawn experiment is not restored, redirected or reused.

## Content model

`content/mortgage_concepts.ts` holds eight domains, 26 topics, 102 concepts, 73 explicit analytical relationships, a public-reference registry and five reading paths. Add nodes through the data, keeping stable snake_case IDs. Every node needs an explanation, a meaningful misconception, a question and answer, an existing parent, at least one labeled connection, and verified public sources. A formula needs units, timing and assumptions next to it. Graph-integrity tests catch missing targets and disconnected clusters.

The source registry was checked against public CFPB, Fannie Mae, New York Fed, SIFMA, SEC, FINRA and CME material on September 12, 2026. Historical research is used for concepts and conventions, not current market statistics. Public sources are linked, not mirrored. Numerical examples are small original arithmetic illustrations, not observed market or mortgage-pool data. No pricing engine, forecast or market feed is provided.

The source inventory did not recover a verifiable complete list of the owner's previously shared mortgage newsletters. Do not claim those articles have been integrated. Add an article only after reading the actual public source and attaching its URL to the relevant concepts. Never publish private screenshots, employer material, personal notes, restricted book PDFs or full newsletter text under this authorization.

## Interaction

The home entry remains between Channels and Music. The map now uses an explicit root → domain → topic → concept hierarchy. Overview, Topics and All concepts expose successive levels; selecting a domain or topic scopes the canvas. Search includes aliases and ranks exact concepts first. Connections reorganizes a selected concept and its incoming/outgoing relationships into a readable study, separate from the complete hierarchy. Causal mechanisms, definitions, measurements and comparisons are typed in the data. The old related-reading links remain associations and are not silently promoted to causal edges.

Visitors can drag empty map space, zoom with buttons, fit the map, focus a selection and navigate via a minimap. A larger expanded mode is available. Ordinary mouse-wheel scrolling remains native. Arrow keys pan a focused canvas, +/− zoom, and Home fits. List provides the same hierarchy without spatial navigation. The reader preserves formulas, distinctions, source links and self-checks; on small screens it becomes a dismissible reading sheet. State is local to the page visit; no account, tracking or persistence is added.

Layout is deterministic, computed in `lib/mortgage_graph.ts`. Node boxes do not overlap at any hierarchy depth. Connection studies reveal every endpoint. A ResizeObserver measures the viewport, while camera math keeps zoom anchors stable. No graph library, force simulation, animation loop, pricing engine or extra runtime dependency is added. The homepage retains its lightweight static preview; the larger catalog stays in the map route’s separate bundle.

New public references include the Treasury curve methodology, New York Fed SOFR/ARRC material, FHFA lock-in research, OCC commercial-property lending guidance, CREFC definitions and a CLO coverage-test primer. Coverage tests are explicitly conditional on a deal using them; the map does not imply every MBS has OC/IC triggers. Original financial explanations were reviewed for direction, assumptions and source fit.

## Boundaries and validation

Keep the old route returning 404 with noindex and absent from links and sitemap. The new route is `/portfolio/mortgage-map`, with its own metadata and sitemap entry. Existing publishing privacy checks still apply. Do not change deployment gates to accommodate this project.

Required checks: lint, TypeScript, tests, content checker, supported production build and exact-head Site checks CI. Browser QA must distinguish actual preview interactions from production HTTP verification. Do not infer employer clearance from public-source status.

The running calculator, component, math implementation, tests and document were already removed from main. This task also removed its three local working branches and six local archive/commit intermediates. The experiment shared the personal website's repository; there was no separate repository to delete. Available native tools do not provide removal of GitHub historical commits/PRs/remote branches or old Sites versions. No complete history-erasure claim is made and the website repository itself is preserved.
