# Mortgage Lab

Jingheng requested a side project for his personal site on September 12, 2026. The first slice is `/lab/mortgage`, linked from the homepage footer. It preserves the six navigation links and the existing collections and publishing channels. It uses no account, market-data feed, new dependency or tracking.

## Accepted design

The separate critic and design editor accepted ML-MODEL-01 (a coherent mortgage-pool model), ML-ACCESS-01 (numeric and keyboard alternatives to sliders and visual curves), and ML-FIT-01 (a restrained entry inside the existing site). The parent implements; independent review and publishing use the existing project workflow.

Inputs default to $1 million, a 6% note rate, a 30-year original term and 6% annual CPR. They are hypothetical assumptions. The primary comparison is outstanding principal under the selected CPR against a zero-prepayment baseline. Outputs are weighted-average life, first-month scheduled P&I and total undiscounted mortgage interest. A compact mobile result makes average life visible before the controls; annual balances remain available without hover.

## Calculation

`lib/mortgage_pool.ts` models identical, newly originated fixed-rate mortgages. The monthly note rate is annual note rate / 12. SMM is `1 - (1 - CPR) ** (1 / 12)`. Each month earns interest on beginning balance, pays scheduled principal and then prepays SMM times the remaining scheduled balance. Surviving loans retain their original payment and maturity; aggregate scheduled pool payments decline with survival. The last scheduled payment retires the remaining principal.

WAL weights each principal receipt by month / 12 and divides by original principal. It is not final maturity. Interest is undiscounted and before fees; it is not a security return. The model has no seasoning, defaults, servicing costs, taxes, insurance, payment delays or endogenous refinancing response. The note rate and CPR are independent inputs.

The independent test formula is `scenario_balance(t) = zero_CPR_balance(t) * (1 - CPR) ** (t / 12)`. Tests compare every month against a closed-form amortization balance across zero, small and ordinary interest rates and multiple CPRs, including full first-month prepayment. Other checks cover conservation of principal, zero terminal balance, known P&I, WAL monotonicity and invalid-input rejection.

Definitions: [CFPB amortization explanation](https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/); [New York Fed Staff Report 931, printed page 35](https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr931.pdf#page=37).

## Interaction and maintenance

Inputs accept precise numeric edits and the installed single-thumb Slider. Invalid drafts show the permitted range and retain the last valid calculation. Reset restores all defaults. The chart uses solid and dashed strokes and a text comparison; its axis labels remain HTML text at mobile size. SVG title/description use a single string to avoid a server/client text-node mismatch. There is no chart animation or hover-only information. The footer link anchors the destination to its start.

Keep the model independent of publication content and do not import article data into the client component. A new route is included in the sitemap; the publication regression test still asserts the exact internal route list and private-content exclusions. Record actual browser and independent-review evidence in the PR body. Device/Safari, 320px resizing and OS motion-preference emulation require capabilities beyond the current 1440x900 and 390x844 Chrome iframe previews and must not be claimed from these checks.
