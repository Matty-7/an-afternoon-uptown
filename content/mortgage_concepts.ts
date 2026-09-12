// Public learning content only. Keep every concept and relationship source-backed.
// See docs/mortgage_map.md before adding reading material or calculations.
export type MortgageConcept = {
  id: string;
  branch: string;
  title: string;
  subtitle: string;
  aliases: string[];
  summary: string;
  formula?: { expression: string; assumptions: string; example?: string };
  distinction: string;
  links: { id: string; reason: string }[];
  question: string;
  answer: string;
  sources: string[];
};

export const mortgage_branches = [
  {
    "id": "basics",
    "title": "Loan & pool basics",
    "question": "What is being financed?"
  },
  {
    "id": "prepayment",
    "title": "Prepayment",
    "question": "When does principal return?"
  },
  {
    "id": "trading",
    "title": "Securitization & trading",
    "question": "What changes hands?"
  },
  {
    "id": "valuation",
    "title": "Cash flows & valuation",
    "question": "How do payments become value?"
  },
  {
    "id": "risk",
    "title": "Risk & hedging",
    "question": "What changes when rates move?"
  },
  {
    "id": "structure",
    "title": "CMO & structure",
    "question": "Who receives which cash flow?"
  }
];

export const mortgage_sources: Record<string, { publisher: string; title: string; url: string }> = {
  "cfpb": {
    "publisher": "CFPB",
    "title": "How does paying down a mortgage work?",
    "url": "https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/"
  },
  "arm": {
    "publisher": "CFPB",
    "title": "Fixed-rate and adjustable-rate mortgages",
    "url": "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-fixed-rate-and-adjustable-rate-mortgage-arm-loan-en-100/"
  },
  "basics": {
    "publisher": "Fannie Mae",
    "title": "Basics of Single-Family MBS · cash flows, factors and guarantees",
    "url": "https://capitalmarkets.fanniemae.com/media/4271/display"
  },
  "cohort": {
    "publisher": "Federal Reserve Bank of New York",
    "title": "Asset Pricing with Cohort-Based Trading · pp. 35–36",
    "url": "https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr931.pdf#page=37"
  },
  "guide": {
    "publisher": "SIFMA",
    "title": "Investor’s Guide to Mortgage Securities · hosted by Fifth Third",
    "url": "https://www.53.com/content/dam/fifth-third/docs/legal/fts-sifma-investors-guide.pdf"
  },
  "formulas": {
    "publisher": "SIFMA",
    "title": "Standard Formulas · SF-47–57, yield and average-life conventions",
    "url": "https://www.sifma.org/wp-content/uploads/2017/08/chsf.pdf"
  },
  "tba": {
    "publisher": "Federal Reserve Bank of New York",
    "title": "TBA Trading and Liquidity in the Agency MBS Market",
    "url": "https://www.newyorkfed.org/medialibrary/media/research/epr/2013/1212vick.pdf"
  },
  "convexity": {
    "publisher": "Federal Reserve Bank of New York",
    "title": "Convexity Event Risks in a Rising Interest Rate Environment",
    "url": "https://libertystreeteconomics.newyorkfed.org/2014/03/convexity-event-risks-in-a-rising-interest-rate-environment/"
  },
  "dv01": {
    "publisher": "CME Group",
    "title": "Treasury Analytics · DV01 and yield sensitivity",
    "url": "https://www.cmegroup.com/tools-information/quikstrike/quikstrike-treasury-analytics-user-guide.html"
  },
  "hedge": {
    "publisher": "CME Group",
    "title": "Hedging 3-Year Note Issuance · DV01 hedge ratio",
    "url": "https://www.cmegroup.com/education/articles-and-reports/hedging-3-year-note-issuance"
  },
  "structure": {
    "publisher": "Fannie Mae",
    "title": "Basics of Structured Transactions · class types and payment rules",
    "url": "https://capitalmarkets.fanniemae.com/media/4396/display"
  },
  "glossary": {
    "publisher": "FINRA",
    "title": "Mortgage-Backed Securities Data Glossary",
    "url": "https://www.finra.org/finra-data/fixed-income/mbs/glossary"
  },
  "investor": {
    "publisher": "SEC · Investor.gov",
    "title": "Mortgage-Backed Securities and Collateralized Mortgage Obligations",
    "url": "https://www.investor.gov/introduction-investing/investing-basics/glossary/mortgage-backed-securities-and-collateralized"
  },
  "disclosure": {
    "publisher": "FINRA",
    "title": "Regulatory Notice 12-56 · pool-characteristic definitions",
    "url": "https://www.finra.org/rules-guidance/notices/12-56"
  },
  "freddie_factor": {
    "publisher": "Freddie Mac",
    "title": "Calculation of Interest and Principal Payments · applicable factors",
    "url": "https://capitalmarkets.freddiemac.com/mbs/docs/fs_paymentcalc.pdf"
  },
  "freddie_cpr": {
    "publisher": "Freddie Mac",
    "title": "Daily Prepayment Report Guide · CPR annualization, p. 13",
    "url": "https://capitalmarkets.freddiemac.com/mbs/docs/dpr_guide.pdf"
  },
  "freddie_faq": {
    "publisher": "Freddie Mac",
    "title": "Mortgage Securities FAQs · support and accrual classes",
    "url": "https://capitalmarkets.freddiemac.com/mbs/products/faq"
  },
  "fed_spreads": {
    "publisher": "Federal Reserve Board",
    "title": "FEDS 2014-112 · spread definitions, Appendix B.3",
    "url": "https://www.federalreserve.gov/econresdata/feds/2014/files/2014112pap.pdf#page=45"
  },
  "cfa_valuation": {
    "publisher": "CFA Institute",
    "title": "Fixed-Income Bond Valuation: Prices and Yields · public overview",
    "url": "https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/fixed-income-bond-valuation-prices-and-yields"
  },
  "cfa_risk": {
    "publisher": "CFA Institute",
    "title": "Curve-Based and Empirical Fixed-Income Risk Measures · public overview",
    "url": "https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/curve-based-and-empirical-fixed-income-risk-measures"
  },
  "remic": {
    "publisher": "Fannie Mae",
    "title": "Structured Transactions: REMICs and Grantor Trusts",
    "url": "https://capitalmarkets.fanniemae.com/mortgage-backed-securities/structured-transactions-products/structured-transactions-products-remics-and-grantor-trusts"
  },
  "irs": {
    "publisher": "IRS",
    "title": "Form 1066 Instructions · REMIC requirements under Who Must File",
    "url": "https://www.irs.gov/instructions/i1066"
  },
  "smbs": {
    "publisher": "Fannie Mae",
    "title": "SMBS Prospectus · stripped cash flows and prepayment risk, pp. 2 and 8",
    "url": "https://capitalmarkets.fanniemae.com/sites/capmrkt/files/syndicated/mbs/smbspros/FNM_SMBS_Base_20230501.pdf"
  }
};

export const mortgage_concepts: MortgageConcept[] = [
  {
    "id": "principal_interest",
    "branch": "basics",
    "title": "Principal & interest",
    "subtitle": "Balance versus borrowing cost",
    "aliases": [
      "P&I",
      "UPB",
      "unpaid principal balance"
    ],
    "summary": "Principal is the unpaid loan balance. Interest is the cost of borrowing it. A payment can contain both, but only the principal portion reduces the balance.",
    "formula": {
      "expression": "Interest = opening balance × monthly rate",
      "assumptions": "A simplified monthly fixed-rate loan; monthly rate = annual note rate ÷ 12. Taxes, insurance and fees are separate."
    },
    "distinction": "A borrower’s full monthly bill can exceed the principal-and-interest payment.",
    "links": [
      {
        "id": "amortization",
        "reason": "Splits each scheduled payment into these two parts."
      },
      {
        "id": "cash_flows",
        "reason": "Carries principal and interest through to investors."
      }
    ],
    "question": "Does paying interest reduce what is owed?",
    "answer": "No. Principal repayment reduces the balance; interest pays for the time the money was borrowed.",
    "sources": [
      "cfpb"
    ]
  },
  {
    "id": "amortization",
    "branch": "basics",
    "title": "Amortization",
    "subtitle": "Scheduled principal repayment",
    "aliases": [
      "scheduled principal",
      "level payment"
    ],
    "summary": "Amortization pays down principal over the loan’s schedule. With a level fixed-rate payment, interest falls as the balance declines, leaving more of each payment for principal.",
    "distinction": "Scheduled amortization and an early payoff are different components of principal return.",
    "links": [
      {
        "id": "principal_interest",
        "reason": "Explains the two parts of the payment."
      },
      {
        "id": "smm",
        "reason": "Scheduled principal must be removed before measuring monthly prepayments."
      }
    ],
    "question": "Why does the principal share grow even when the payment is unchanged?",
    "answer": "The smaller outstanding balance produces less interest, so more of the same payment repays principal.",
    "sources": [
      "cfpb"
    ]
  },
  {
    "id": "fixed_arm",
    "branch": "basics",
    "title": "Fixed rate & ARM",
    "subtitle": "How the note rate changes",
    "aliases": [
      "adjustable rate mortgage",
      "index",
      "margin",
      "reset",
      "caps"
    ],
    "summary": "A fixed-rate loan keeps its note rate. An adjustable-rate mortgage (ARM) resets under contract terms, commonly using an index plus a margin, with applicable caps and floors.",
    "distinction": "A fixed note rate does not guarantee an unchanged total housing bill. Taxes and insurance can change.",
    "links": [
      {
        "id": "principal_interest",
        "reason": "The note rate determines interest owed."
      },
      {
        "id": "incentive",
        "reason": "The existing loan’s terms affect the benefit of refinancing."
      }
    ],
    "question": "Does an ARM always reset to the current index plus margin?",
    "answer": "Not necessarily: introductory terms, reset dates and contractual limits can constrain the actual rate.",
    "sources": [
      "arm"
    ]
  },
  {
    "id": "pool_factor",
    "branch": "basics",
    "title": "Pool factor",
    "subtitle": "Original face → current face",
    "aliases": [
      "current face",
      "original face",
      "factor"
    ],
    "summary": "A pool factor expresses remaining principal as a share of original principal. It translates the original face amount of a holding into its current face amount.",
    "formula": {
      "expression": "Current face = original face × factor",
      "assumptions": "Use the factor for the correct pool and reporting month; face amounts are dollars.",
      "example": "$100,000 original face × 0.72 factor = $72,000 current face."
    },
    "distinction": "A factor is a principal ratio, not a bond price or an investment return.",
    "links": [
      {
        "id": "prepayments",
        "reason": "Unscheduled paydowns change the factor."
      },
      {
        "id": "price",
        "reason": "Current face is used to convert a price quote into a dollar amount."
      }
    ],
    "question": "Does a 0.72 factor mean the holding lost 28% in market value?",
    "answer": "No. It says principal has paid down; market value also depends on the price of the remaining balance.",
    "sources": [
      "freddie_factor"
    ]
  },
  {
    "id": "pool_averages",
    "branch": "basics",
    "title": "WAC, WAM & WALA",
    "subtitle": "Coupon, maturity and loan age",
    "aliases": [
      "weighted average coupon",
      "weighted average maturity",
      "weighted average loan age",
      "seasoning"
    ],
    "summary": "WAC summarizes loan rates, WAM remaining contractual maturity, and WALA elapsed loan age. Weights and dates follow the disclosure convention; these averages hide variation inside a pool.",
    "distinction": "WAC is not the investor’s security coupon. WAM is not the expected timing of principal repayment.",
    "links": [
      {
        "id": "pass_through",
        "reason": "Fees help explain the difference between loan rates and the security coupon."
      },
      {
        "id": "psa",
        "reason": "Loan age matters to the benchmark prepayment ramp."
      },
      {
        "id": "wal",
        "reason": "Measures principal timing rather than contractual maturity."
      }
    ],
    "question": "Can two pools with the same WAC repay at different speeds?",
    "answer": "Yes. Their loan ages, balances and borrower characteristics can differ even when the average coupon matches.",
    "sources": [
      "disclosure",
      "glossary"
    ]
  },
  {
    "id": "prepayments",
    "branch": "prepayment",
    "title": "Prepayments",
    "subtitle": "Principal returned ahead of schedule",
    "aliases": [
      "voluntary",
      "involuntary",
      "refinance",
      "curtailment",
      "buyout"
    ],
    "summary": "Refinancing, home sales and extra payments can return principal early. Certain removals of delinquent loans can also create unscheduled principal payments to security holders.",
    "distinction": "Unscheduled principal does not always mean a borrower chose to refinance. Deal and reporting rules matter.",
    "links": [
      {
        "id": "smm",
        "reason": "Measures monthly unscheduled principal relative to the eligible balance."
      },
      {
        "id": "cash_flows",
        "reason": "Changes when investors receive principal and stop earning interest on it."
      }
    ],
    "question": "Can principal return early even without falling mortgage rates?",
    "answer": "Yes. Borrowers move or make extra payments, and some loan removals are unrelated to refinancing incentives.",
    "sources": [
      "basics"
    ]
  },
  {
    "id": "smm",
    "branch": "prepayment",
    "title": "SMM",
    "subtitle": "Single monthly mortality",
    "aliases": [
      "monthly prepayment rate"
    ],
    "summary": "SMM measures monthly prepayments against principal remaining after scheduled principal has been repaid.",
    "formula": {
      "expression": "SMM = prepayments ÷ (opening balance − scheduled principal)",
      "assumptions": "Use same-month amounts and a positive denominator."
    },
    "distinction": "Opening balance alone is the wrong denominator.",
    "links": [
      {
        "id": "amortization",
        "reason": "Defines scheduled principal."
      },
      {
        "id": "cpr",
        "reason": "Annualizes monthly survival."
      }
    ],
    "question": "What is the closing balance?",
    "answer": "After scheduled principal, multiply the remaining balance by (1 − SMM).",
    "sources": [
      "cohort"
    ]
  },
  {
    "id": "cpr",
    "branch": "prepayment",
    "title": "CPR",
    "subtitle": "Conditional prepayment rate",
    "aliases": [
      "constant prepayment rate",
      "annualized prepayment"
    ],
    "summary": "CPR expresses a monthly prepayment speed on an annualized basis by compounding survival over twelve months.",
    "formula": {
      "expression": "CPR = 1 − (1 − SMM)¹²\nSMM = 1 − (1 − CPR)^(1/12)",
      "assumptions": "Enter rates as decimals. The annualization assumes the same monthly speed for twelve months.",
      "example": "6% CPR corresponds to about 0.5143% SMM."
    },
    "distinction": "CPR ÷ 12 is an approximation. An annualized observation is not a forecast of the next year.",
    "links": [
      {
        "id": "smm",
        "reason": "Translates the annualized rate back into a monthly rate."
      },
      {
        "id": "psa",
        "reason": "Specifies a changing CPR benchmark as loans age."
      }
    ],
    "question": "Does 6% CPR mean 6% of principal prepays every month?",
    "answer": "No. Its monthly equivalent is roughly half a percent, applied after scheduled principal.",
    "sources": [
      "freddie_cpr"
    ]
  },
  {
    "id": "psa",
    "branch": "prepayment",
    "title": "PSA",
    "subtitle": "An age-based prepayment benchmark",
    "aliases": [
      "Public Securities Association",
      "100 PSA",
      "seasoning ramp"
    ],
    "summary": "100 PSA ramps annualized prepayments from 0.2% CPR in loan month one to 6% in month thirty, then holds that benchmark speed. Other PSA percentages scale the path.",
    "formula": {
      "expression": "CPRₘ = k × min(0.002m, 0.06)",
      "assumptions": "m is loan age in months starting at 1. k = PSA percentage ÷ 100; 150 PSA means k = 1.5. CPR is a decimal; use only valid rates below 100%.",
      "example": "150 PSA at month 10 gives 1.5 × 2% = 3% CPR."
    },
    "distinction": "The ramp starts at origination, not at the day an investor buys a seasoned pool.",
    "links": [
      {
        "id": "cpr",
        "reason": "Provides the annualized rate at each loan age."
      },
      {
        "id": "pool_averages",
        "reason": "Loan age helps locate collateral along the benchmark."
      }
    ],
    "question": "Is 100 PSA the same as a constant 6% CPR from month one?",
    "answer": "No. They match only from loan month thirty onward under the standard ramp.",
    "sources": [
      "guide"
    ]
  },
  {
    "id": "incentive",
    "branch": "prepayment",
    "title": "Incentive & burnout",
    "subtitle": "Why similar loans behave differently",
    "aliases": [
      "refinancing incentive",
      "seasoning",
      "burnout",
      "borrower option"
    ],
    "summary": "Refinancing savings encourage prepayment, but costs and borrower constraints affect participation. After repeated opportunities, the remaining borrowers may respond less strongly: burnout.",
    "distinction": "An attractive rate difference does not make every borrower refinance.",
    "links": [
      {
        "id": "prepayments",
        "reason": "Borrower choices become unscheduled principal."
      },
      {
        "id": "specified",
        "reason": "Collateral characteristics can change the value of prepayment protection."
      },
      {
        "id": "convexity",
        "reason": "Rate-sensitive exercise changes the shape of price sensitivity."
      }
    ],
    "question": "Why can equal-coupon pools repay differently?",
    "answer": "Borrower constraints, refinancing histories and transaction costs can differ.",
    "sources": [
      "cohort"
    ]
  },
  {
    "id": "pass_through",
    "branch": "trading",
    "title": "Pass-through MBS",
    "subtitle": "From loan pool to security",
    "aliases": [
      "mortgage backed security",
      "securitization",
      "servicing",
      "guarantee fee"
    ],
    "summary": "A pass-through security channels mortgage-pool payments to investors. Loan interest supports the investor coupon after applicable servicing and guarantee fees.",
    "distinction": "The security coupon and the borrowers’ note rates describe different cash flows.",
    "links": [
      {
        "id": "pool_averages",
        "reason": "WAC describes the loans behind the security."
      },
      {
        "id": "cash_flows",
        "reason": "Separates interest, scheduled principal and unscheduled principal."
      },
      {
        "id": "cmo",
        "reason": "Further redistributes these payments among classes."
      }
    ],
    "question": "Does a 6% loan coupon imply a 6% security coupon?",
    "answer": "No. Fees and the security’s terms affect the amount of interest passed through.",
    "sources": [
      "basics"
    ]
  },
  {
    "id": "agency",
    "branch": "trading",
    "title": "Agency & non-agency",
    "subtitle": "Guarantees and credit exposure",
    "aliases": [
      "Fannie Mae",
      "Freddie Mac",
      "Ginnie Mae",
      "private label",
      "credit risk"
    ],
    "summary": "Agency MBS carry guarantees under the issuer’s program. Non-agency securities rely on their collateral and structural protections. Guarantee coverage and legal backing differ across programs.",
    "distinction": "Credit protection does not remove interest-rate, prepayment or liquidity risk. Not every agency guarantee is the same sovereign obligation.",
    "links": [
      {
        "id": "tba",
        "reason": "Standard agency collateral supports forward trading."
      },
      {
        "id": "extension",
        "reason": "Principal timing remains uncertain even with credit protection."
      }
    ],
    "question": "Can a guaranteed MBS fall in market price?",
    "answer": "Yes. A payment guarantee does not fix its trading price when rates, spreads or liquidity change.",
    "sources": [
      "investor"
    ]
  },
  {
    "id": "tba",
    "branch": "trading",
    "title": "TBA",
    "subtitle": "To-be-announced trading",
    "aliases": [
      "forward",
      "pool allocation"
    ],
    "summary": "A TBA trade agrees standardized security characteristics and settlement terms before the individual eligible pools are allocated.",
    "distinction": "The buyer knows the agreed trade characteristics, but not the final pool identities at trade time.",
    "links": [
      {
        "id": "specified",
        "reason": "Identifies the collateral at trade time instead."
      },
      {
        "id": "rolls",
        "reason": "Uses two settlement months to transfer an exposure through time."
      }
    ],
    "question": "Is every mortgage deliverable?",
    "answer": "No. Trade characteristics and eligibility rules constrain delivery.",
    "sources": [
      "tba"
    ]
  },
  {
    "id": "specified",
    "branch": "trading",
    "title": "Specified pools",
    "subtitle": "Collateral characteristics and pay-ups",
    "aliases": [
      "specified pool",
      "payup",
      "pay-up",
      "loan balance"
    ],
    "summary": "A specified-pool trade identifies its collateral. A pay-up is a price difference relative to a comparable TBA position, reflecting characteristics investors value.",
    "distinction": "A pay-up is a price premium, not an extra coupon payment.",
    "links": [
      {
        "id": "tba",
        "reason": "Supplies the comparison used for a pay-up."
      },
      {
        "id": "incentive",
        "reason": "Borrower behavior helps explain why collateral can matter."
      }
    ],
    "question": "Why can equal-coupon pools have different prices?",
    "answer": "Their collateral and expected payment patterns differ.",
    "sources": [
      "tba"
    ]
  },
  {
    "id": "rolls",
    "branch": "trading",
    "title": "Settlement & dollar rolls",
    "subtitle": "Moving an MBS position through time",
    "aliases": [
      "dollar roll",
      "drop",
      "settlement"
    ],
    "summary": "A dollar roll pairs a sale for one settlement month with a purchase of similar TBA securities for a later month, or the reverse.",
    "distinction": "The price difference alone is not the complete return.",
    "links": [
      {
        "id": "tba",
        "reason": "Defines the deliverable exposure in each leg."
      },
      {
        "id": "cash_flows",
        "reason": "Payments forgone between settlements affect the comparison."
      }
    ],
    "question": "Must the same pools return?",
    "answer": "No. Later delivery can use different eligible pools.",
    "sources": [
      "tba"
    ]
  },
  {
    "id": "cash_flows",
    "branch": "valuation",
    "title": "Cash-flow components",
    "subtitle": "Interest + scheduled + unscheduled principal",
    "aliases": [
      "cash flow",
      "principal distribution",
      "payment delay"
    ],
    "summary": "For a simple pass-through, investor payments combine interest, scheduled principal and unscheduled principal. Timing follows the security’s distribution rules.",
    "distinction": "A principal payment returns invested balance; it is not all investment income.",
    "links": [
      {
        "id": "prepayments",
        "reason": "Changes the unscheduled-principal component."
      },
      {
        "id": "wal",
        "reason": "Summarizes the timing of principal payments."
      },
      {
        "id": "pv",
        "reason": "Discounts the payment stream into a present amount."
      }
    ],
    "question": "Why can faster prepayments reduce future interest?",
    "answer": "Once principal is repaid, that principal no longer generates future coupon payments.",
    "sources": [
      "freddie_factor"
    ]
  },
  {
    "id": "wal",
    "branch": "valuation",
    "title": "WAL",
    "subtitle": "Weighted-average life",
    "aliases": [
      "average life",
      "principal timing"
    ],
    "summary": "WAL summarizes when principal is received under a specified payment path. It weights each principal payment by its time of receipt.",
    "formula": {
      "expression": "WAL = Σ(t × principalₜ) ÷ Σ(principalₜ)",
      "assumptions": "t is years from measurement. Full recovery and no capitalized interest are assumed; accrual classes need specific conventions.",
      "example": "$40 after one year and $60 after three years: (1 × 40 + 3 × 60) ÷ 100 = 2.2 years."
    },
    "distinction": "WAL is not duration or a promised maturity. It excludes interest weighting and can change with prepayments.",
    "links": [
      {
        "id": "cash_flows",
        "reason": "Provides the projected principal schedule."
      },
      {
        "id": "duration",
        "reason": "Measures rate sensitivity rather than principal timing."
      },
      {
        "id": "z_class",
        "reason": "Accreted principal needs special average-life treatment."
      }
    ],
    "question": "Can a security have different WALs?",
    "answer": "Yes. Different principal paths produce different average lives.",
    "sources": [
      "formulas"
    ]
  },
  {
    "id": "price",
    "branch": "valuation",
    "title": "Price & accrued interest",
    "subtitle": "A quote is not a dollar invoice",
    "aliases": [
      "clean price",
      "dirty price",
      "full price",
      "settlement amount"
    ],
    "summary": "Multiply current face by price per 100 to obtain principal value. Accrued interest affects the settlement invoice.",
    "formula": {
      "expression": "Quoted principal value = current face × price ÷ 100",
      "assumptions": "Price is points per 100 of current face. Excludes accrued interest and settlement adjustments.",
      "example": "$72,000 current face at 101.5 gives $73,080 before accrued interest."
    },
    "distinction": "101.5 is a price quote, not a yield.",
    "links": [
      {
        "id": "pool_factor",
        "reason": "Converts original face into the current principal amount."
      },
      {
        "id": "pv",
        "reason": "Connects price with a cash-flow and discount-rate convention."
      }
    ],
    "question": "Can identical prices produce different invoices?",
    "answer": "Yes: face amount, accrued interest or settlement terms may differ.",
    "sources": [
      "cfa_valuation",
      "formulas"
    ]
  },
  {
    "id": "pv",
    "branch": "valuation",
    "title": "Present value & yield",
    "subtitle": "Discounting a specified payment stream",
    "aliases": [
      "PV",
      "discount rate",
      "yield to maturity",
      "compounding"
    ],
    "summary": "Present value discounts specified cash flows. Yield reconciles that payment path with price using stated timing and compounding.",
    "formula": {
      "expression": "P = Σ CFₜ ÷ (1 + i)ᵗ",
      "assumptions": "CFₜ is a payment at period t; i is the decimal yield per matching period. Settlement adjustments are omitted.",
      "example": "$105 paid in one year discounted at 5% has a present value of $100."
    },
    "distinction": "Yield from assumed cash flows is not a guaranteed realized return.",
    "links": [
      {
        "id": "cash_flows",
        "reason": "Supplies the payment path being discounted."
      },
      {
        "id": "spreads",
        "reason": "Adds a benchmark curve and model convention to the comparison."
      }
    ],
    "question": "Why match the rate and payment periods?",
    "answer": "An annual rate applied to monthly periods without conversion discounts incorrectly.",
    "sources": [
      "cfa_valuation"
    ]
  },
  {
    "id": "spreads",
    "branch": "valuation",
    "title": "Yield spread, Z-spread & OAS",
    "subtitle": "Three different comparisons",
    "aliases": [
      "option adjusted spread",
      "zero volatility spread",
      "I-spread",
      "benchmark curve"
    ],
    "summary": "A yield spread compares yields. Z-spread adds one constant spread to a reference zero-coupon curve to fit a specified payment path to price. OAS fits price using rate paths and option-sensitive cash flows.",
    "distinction": "OAS depends on rate, volatility and prepayment assumptions; different models can disagree.",
    "links": [
      {
        "id": "pv",
        "reason": "Defines discounting."
      },
      {
        "id": "incentive",
        "reason": "Changes modeled payments."
      },
      {
        "id": "convexity",
        "reason": "Shows rate-dependent payment behavior."
      }
    ],
    "question": "Is OAS observed independently of a model?",
    "answer": "No. A model infers it from price.",
    "sources": [
      "fed_spreads",
      "cohort"
    ]
  },
  {
    "id": "duration",
    "branch": "risk",
    "title": "Effective duration",
    "subtitle": "Sensitivity after cash flows respond",
    "aliases": [
      "rate sensitivity",
      "option adjusted duration"
    ],
    "summary": "Effective duration estimates local price sensitivity to a defined rate shock, allowing option-sensitive payments to change in the repricing.",
    "formula": {
      "expression": "Dₑff ≈ (P₋ − P₊) ÷ (2P₀Δy)",
      "assumptions": "P₋ and P₊ are modeled prices after equal down/up rate shocks. P₀ is the base price; Δy is a positive decimal rate shift. Re-estimate cash flows consistently.",
      "example": "P₀ = 100, P₋ = 100.4, P₊ = 99.6 and Δy = 0.001 imply duration ≈ 4."
    },
    "distinction": "Holding cash flows fixed measures a different sensitivity. WAL does not substitute for duration.",
    "links": [
      {
        "id": "dv01",
        "reason": "Converts percentage sensitivity into dollars per basis point."
      },
      {
        "id": "convexity",
        "reason": "Explains why duration itself changes as rates move."
      }
    ],
    "question": "Why re-estimate mortgage payments after a rate shock?",
    "answer": "The shock can change borrower exercise and therefore the timing of the cash flows being valued.",
    "sources": [
      "cfa_risk"
    ]
  },
  {
    "id": "dv01",
    "branch": "risk",
    "title": "DV01",
    "subtitle": "Dollars per one-basis-point move",
    "aliases": [
      "dollar duration",
      "basis point",
      "BPV",
      "PV01"
    ],
    "summary": "DV01 expresses local rate exposure in dollars per basis point. For a positive-duration position, a small upward rate move generally reduces price.",
    "formula": {
      "expression": "DV01 ≈ market value × duration × 0.0001",
      "assumptions": "A first-order magnitude for the same rate-shock convention used in duration. Market value is dollars; one basis point = 0.0001 in decimal rate.",
      "example": "$100,000 × 4 × 0.0001 = about $40 per basis point."
    },
    "distinction": "Sign conventions vary. Matching DV01 does not neutralize convexity, spread or curve-shape changes.",
    "links": [
      {
        "id": "duration",
        "reason": "Provides the underlying rate sensitivity."
      },
      {
        "id": "hedging",
        "reason": "Scales the local interest-rate exposure of a hedge."
      }
    ],
    "question": "Does $40 DV01 predict exactly a $4,000 loss for a 100 bp rise?",
    "answer": "No. That extrapolates a local approximation across a large move; duration and cash flows can change.",
    "sources": [
      "dv01"
    ]
  },
  {
    "id": "convexity",
    "branch": "risk",
    "title": "Negative convexity",
    "subtitle": "When rate sensitivity bends",
    "aliases": [
      "prepayment option",
      "convexity risk"
    ],
    "summary": "In relevant rate ranges, refinancing can shorten MBS cash flows as rates fall and limit price gains. As rates rise, slower prepayments can lengthen exposure. Duration then changes with the rate level.",
    "distinction": "Not every MBS or structured class has negative convexity in every market state.",
    "links": [
      {
        "id": "incentive",
        "reason": "Rate changes affect the borrower’s incentive to exercise."
      },
      {
        "id": "extension",
        "reason": "Shows the timing consequences on either side of a rate move."
      },
      {
        "id": "hedging",
        "reason": "A changing duration can require a hedge adjustment."
      }
    ],
    "question": "Why might a hedge that matched yesterday be too small today?",
    "answer": "A rate increase can extend MBS duration, raising its rate exposure relative to the old hedge.",
    "sources": [
      "convexity"
    ]
  },
  {
    "id": "extension",
    "branch": "risk",
    "title": "Contraction & extension",
    "subtitle": "Principal returns sooner or later",
    "aliases": [
      "contraction risk",
      "extension risk",
      "reinvestment risk"
    ],
    "summary": "Contraction brings principal back sooner; extension delays it relative to the expected schedule. Each changes reinvestment needs and the life of the exposure.",
    "distinction": "These are timing risks, not synonyms for default. Credit-protected securities can still experience both.",
    "links": [
      {
        "id": "prepayments",
        "reason": "Changes the speed of principal return."
      },
      {
        "id": "wal",
        "reason": "Summarizes the resulting principal timing."
      },
      {
        "id": "pac",
        "reason": "Redistributes some timing variability across classes."
      }
    ],
    "question": "Why can early repayment be unwelcome when rates fall?",
    "answer": "Principal comes back when replacement investments may offer lower yields.",
    "sources": [
      "investor"
    ]
  },
  {
    "id": "hedging",
    "branch": "risk",
    "title": "Hedging & basis risk",
    "subtitle": "Matching one exposure leaves others",
    "aliases": [
      "hedge ratio",
      "Treasury futures",
      "curve risk",
      "spread risk"
    ],
    "summary": "A rate hedge offsets a chosen measure of interest-rate exposure. The mortgage position and hedge can still respond differently to spreads, curve shape, volatility and borrower behavior.",
    "formula": {
      "expression": "Hedge units ≈ exposure DV01 ÷ hedge-unit DV01",
      "assumptions": "Use consistent dollars-per-basis-point measures and the opposite exposure direction. This is a local sizing relationship, not a trade recommendation."
    },
    "distinction": "A zero net DV01 is not a risk-free portfolio.",
    "links": [
      {
        "id": "dv01",
        "reason": "Provides a comparable local exposure unit."
      },
      {
        "id": "convexity",
        "reason": "Changes exposure after the hedge is put on."
      },
      {
        "id": "spreads",
        "reason": "Mortgage and benchmark prices need not move together."
      }
    ],
    "question": "Can a rate-hedged MBS lose value when Treasury yields do not move?",
    "answer": "Yes. Mortgage spreads, liquidity or modeled borrower behavior can change independently.",
    "sources": [
      "hedge"
    ]
  },
  {
    "id": "cmo",
    "branch": "structure",
    "title": "CMO & REMIC",
    "subtitle": "Payment structure versus tax framework",
    "aliases": [
      "collateralized mortgage obligation",
      "real estate mortgage investment conduit",
      "tranche"
    ],
    "summary": "A CMO redistributes mortgage payments among classes. REMIC describes a tax framework often used for these structures.",
    "distinction": "Neither label alone tells you the payment priority of a particular class.",
    "links": [
      {
        "id": "sequential",
        "reason": "Uses one possible principal-allocation rule."
      },
      {
        "id": "pass_through",
        "reason": "Can supply the underlying mortgage cash flows."
      }
    ],
    "question": "Does a REMIC label reveal which class repays first?",
    "answer": "No. Read the transaction’s actual distribution rules.",
    "sources": [
      "remic",
      "irs"
    ]
  },
  {
    "id": "sequential",
    "branch": "structure",
    "title": "Sequential pay",
    "subtitle": "Principal in a specified order",
    "aliases": [
      "waterfall",
      "payment priority"
    ],
    "summary": "In a simple sequential structure, principal retires one class before moving to the next. Interest follows each class’s terms.",
    "distinction": "Payment order changes timing; it does not automatically establish credit subordination.",
    "links": [
      {
        "id": "cmo",
        "reason": "Defines the broader cash-flow structure."
      },
      {
        "id": "extension",
        "reason": "Later-paying classes can experience delayed principal."
      }
    ],
    "question": "Do later classes necessarily receive no interest while waiting?",
    "answer": "No. Principal priority and interest-payment rules are separate.",
    "sources": [
      "structure"
    ]
  },
  {
    "id": "pac",
    "branch": "structure",
    "title": "PAC",
    "subtitle": "Planned amortization class",
    "aliases": [
      "PAC band",
      "planned amortization schedule"
    ],
    "summary": "A PAC targets a principal schedule while companion classes absorb variability. That protection depends on collateral behavior and available support.",
    "distinction": "A PAC schedule is conditional, not an unconditional promise across all future prepayment paths.",
    "links": [
      {
        "id": "support",
        "reason": "Absorbs timing variability to support the schedule."
      },
      {
        "id": "extension",
        "reason": "Describes the timing risks the structure seeks to manage."
      }
    ],
    "question": "Can a PAC lose its expected timing protection?",
    "answer": "Yes. Support can be depleted or actual prepayment paths can exceed the structure’s capacity.",
    "sources": [
      "structure"
    ]
  },
  {
    "id": "support",
    "branch": "structure",
    "title": "Support / companion",
    "subtitle": "Absorbing principal variability",
    "aliases": [
      "support class",
      "companion tranche"
    ],
    "summary": "Support classes take a more variable principal path so another class can follow a more stable schedule.",
    "distinction": "A companion label concerns payment timing; it does not by itself mean first-loss credit protection.",
    "links": [
      {
        "id": "pac",
        "reason": "Receives the benefit of the support mechanism."
      },
      {
        "id": "wal",
        "reason": "Can vary substantially as the companion’s principal path changes."
      }
    ],
    "question": "Where does the variability go when a PAC schedule is stabilized?",
    "answer": "Other classes absorb it under the transaction’s rules; the underlying uncertainty has not disappeared.",
    "sources": [
      "freddie_faq"
    ]
  },
  {
    "id": "z_class",
    "branch": "structure",
    "title": "Accrual / Z classes",
    "subtitle": "Interest can become principal",
    "aliases": [
      "Z bond",
      "accretion",
      "accrual bond"
    ],
    "summary": "During an accrual phase, a Z class can add interest to principal instead of receiving that interest in cash.",
    "distinction": "Accrual does not automatically mean most junior.",
    "links": [
      {
        "id": "sequential",
        "reason": "Payment priorities determine when cash distributions begin."
      },
      {
        "id": "wal",
        "reason": "Returns to the principal-timing measure and its accrual-class convention."
      }
    ],
    "question": "Can the class balance rise without the investor buying more?",
    "answer": "Yes. Accrued interest can be added to principal under the class terms.",
    "sources": [
      "freddie_faq"
    ]
  },
  {
    "id": "io_po",
    "branch": "structure",
    "title": "IO & PO",
    "subtitle": "Interest-only and principal-only strips",
    "aliases": [
      "interest only",
      "principal only",
      "stripped MBS"
    ],
    "summary": "IO and PO interests separate interest and principal payments. Faster paydowns can reduce future IO income while returning PO principal sooner.",
    "distinction": "Their rate exposure cannot be inferred from an ordinary coupon bond. Valuation depends strongly on the payment path.",
    "links": [
      {
        "id": "cash_flows",
        "reason": "Identifies which part of the payment stream each strip receives."
      },
      {
        "id": "prepayments",
        "reason": "Changes both future interest and principal timing."
      }
    ],
    "question": "Why can faster principal return hurt an IO?",
    "answer": "Less outstanding principal remains to generate the future interest the IO receives.",
    "sources": [
      "smbs"
    ]
  }
];

export const learning_path = [
  {
    "id": "incentive",
    "connection": "changes principal timing"
  },
  {
    "id": "cash_flows",
    "connection": "determines average life"
  },
  {
    "id": "wal",
    "connection": "reveals contraction or extension"
  },
  {
    "id": "extension",
    "connection": ""
  }
];
