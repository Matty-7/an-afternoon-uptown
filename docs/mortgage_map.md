# Mortgage Map

On September 12, 2026, Jingheng explicitly requested a public interactive knowledge map in a real Portfolio section. This is a separate educational reading project. The withdrawn experiment is not restored, redirected or reused.

## Content model

`content/mortgage_concepts.ts` holds ten domains, 36 topics, 138 concepts, 149 explicit analytical relationships, a public-reference registry and nine reading paths. Add nodes through the data, keeping stable snake_case IDs. Every node needs an explanation, a meaningful misconception, a question and answer, an existing parent, at least one labeled connection, and verified public sources. A formula needs units, timing and assumptions next to it. Graph-integrity tests catch missing targets and disconnected clusters.

The source registry was checked against public CFPB, Fannie Mae, New York Fed, SIFMA, SEC, FINRA and CME material on September 12, 2026. Historical research is used for concepts and conventions, not current market statistics. Public sources are linked, not mirrored. Numerical examples are small original arithmetic illustrations, not observed market or mortgage-pool data. No pricing engine, forecast or market feed is provided.

The source inventory did not recover a verifiable complete list of the owner's previously shared mortgage newsletters. Do not claim those articles have been integrated. Add an article only after reading the actual public source and attaching its URL to the relevant concepts. Never publish private screenshots, employer material, personal notes, restricted book PDFs or full newsletter text under this authorization.

## Interaction

The home entry remains between Channels and Music. The map now uses an explicit root → domain → topic → concept hierarchy. Overview, Topics and All concepts expose successive levels; selecting a domain or topic scopes the canvas. Search includes aliases and ranks exact concepts first. Connections reorganizes a selected concept and its incoming/outgoing relationships into a readable study, separate from the complete hierarchy. Causal mechanisms, definitions, measurements and comparisons are typed in the data. The old related-reading links remain associations and are not silently promoted to causal edges.

Visitors can drag empty map space, zoom with buttons, fit the map, focus a selection and navigate via a minimap. A larger expanded mode is available. Ordinary mouse-wheel scrolling remains native. Arrow keys pan a focused canvas, +/− zoom, and Home fits. List provides the same hierarchy without spatial navigation. The reader preserves formulas, distinctions, source links and self-checks; on small screens it becomes a dismissible reading sheet. State is local to the page visit; no account, tracking or persistence is added.

Layout is deterministic, computed in `lib/mortgage_graph.ts`. Node boxes do not overlap at any hierarchy depth. Connection studies reveal every endpoint. A ResizeObserver measures the viewport, while camera math keeps zoom anchors stable. No graph library, force simulation, animation loop or pricing engine is added. KaTeX renders 29 formulas on the server into HTML and MathML; only locally bundled styling/fonts and generated markup reach the page. Its parser is not imported into the client component. The homepage retains its lightweight static preview; the larger catalog stays in the map route’s separate bundle.

New public references include the Treasury curve methodology, New York Fed SOFR/ARRC material, FHFA lock-in research, OCC commercial-property lending guidance, CREFC definitions and a CLO coverage-test primer. Coverage tests are explicitly conditional on a deal using them; the map does not imply every MBS has OC/IC triggers. Original financial explanations were reviewed for direction, assumptions and source fit.

## Boundaries and validation

Keep the old route returning 404 with noindex and absent from links and sitemap. The new route is `/portfolio/mortgage-map`, with its own metadata and sitemap entry. Existing publishing privacy checks still apply. Do not change deployment gates to accommodate this project.

Required checks: lint, TypeScript, tests, content checker, supported production build and exact-head Site checks CI. Browser QA must distinguish actual preview interactions from production HTTP verification. Do not infer employer clearance from public-source status.

The running calculator, component, math implementation, tests and document were already removed from main. This task also removed its three local working branches and six local archive/commit intermediates. The experiment shared the personal website's repository; there was no separate repository to delete. Available native tools do not provide removal of GitHub historical commits/PRs/remote branches or old Sites versions. No complete history-erasure claim is made and the website repository itself is preserved.

## September 12: comparison and mathematical reading revision

Accepted critic findings ATLAS-01 (edge geometry and chrome overlap), ATLAS-02 (plain-string formulas), and ATLAS-03 (spread/product/currency coverage).

The hierarchy has no analytical arrows. Connections deduplicates each selected-neighbor pair visually, retains full directed explanations in the reader, and routes labels on dedicated outer-node lanes. Comparison edges use a dashed line without a causal arrow. Caption and navigation/minimap now occupy separate rows outside the clipped interactive canvas. Camera and entry transitions last 200–240ms, are disabled while dragging where appropriate, and respect reduced motion. Selecting a concept preserves a ready topic layout; searching outside it focuses the new concept’s topic.

Compare offers spread, product, currency and time/maturity tables. Rows open the same sourced reader and connections used by the graph. Mobile tables become labeled comparison cards. Nine spread measures distinguish benchmark, projected cash flows, options, use and caveats. Product dimensions distinguish collateral, guarantee, structure and coupon; the catalog includes RMBS, CMBS, ABS, CLO, CRT, covered, sovereign, corporate, municipal, zero-coupon, inflation-linked and callable debt. Six currency profiles distinguish policy context, overnight/term references and observation conventions. This is conceptual coverage, without live levels. HPI/HPA, caps/floors, securitization roles and reverse-mortgage balance behavior bring additional useful note themes into the public catalog.

New original explanations link to public benchmark administrators, central banks, SEC, Treasury, FHFA, CFPB, Fannie Mae, CFA Institute, LSEG, BIS and EUR-Lex. Internal identifiers and implementation mappings are not part of the public guide. The guide does not represent a complete inventory of every country, product or spread convention.

Validation additionally renders every formula in strict mode with MathML, checks comparison targets and dimensions, and checks every connection label against all node rectangles and other labels. Browser acceptance covers desktop comparison/reader/Connections and a 390px CSS viewport; this is not physical-device or assistive-technology testing.
