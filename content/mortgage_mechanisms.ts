import type {
  MortgageConcept,
  MortgageRelationship,
} from './mortgage_concepts.ts';

// Original explanations of public mechanisms. Sources establish concepts, not
// current market forecasts or claims about a particular firm's implementation.
export const mechanism_sources = {
  dti_public: {
    publisher: 'CFPB',
    title: 'Debt-to-income ratio',
    url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/',
  },
  affordability_public: {
    publisher: 'CFPB',
    title: 'Explore mortgage rates and loan costs',
    url: 'https://www.consumerfinance.gov/owning-a-home/explore-rates/',
  },
  underwriting_public: {
    publisher: 'CFPB',
    title: 'Ability to repay',
    url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-the-ability-to-repay-rule-en-1787/',
  },
  assumption_public: {
    publisher: 'US Department of Veterans Affairs',
    title: 'Loan assumption processing',
    url: 'https://www.benefits.va.gov/HOMELOANS/documents/circulars/26-23-10.pdf',
  },
  assumption_gap: {
    publisher: 'U.S. Bank',
    title: 'How an assumable mortgage works',
    url: 'https://www.usbank.com/financialiq/manage-your-household/home-ownership/what-is-an-assumable-mortgage.html',
  },
  primary_secondary_public: {
    publisher: 'Federal Reserve Bank of New York',
    title: 'The rising gap between primary and secondary mortgage rates',
    url: 'https://www.newyorkfed.org/medialibrary/media/research/epr/2013/1113fust.pdf',
  },
  rate_lock_public: {
    publisher: 'CFPB',
    title: 'Mortgage rate locks',
    url: 'https://www.consumerfinance.gov/ask-cfpb/whats-a-lock-in-or-a-rate-lock-en-143/',
  },
  pipeline_public: {
    publisher: 'Office of the Comptroller of the Currency',
    title: 'Mortgage Banking Handbook',
    url: 'https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/mortgage-banking/pub-ch-mortgage-banking.pdf',
  },
  tba_hedge_public: {
    publisher: 'Milliman',
    title: 'Mortgage secondary pipeline hedging with TBAs',
    url: 'https://www.milliman.com/en/insight/mortgage-secondary-pipeline-hedging-tbas',
  },
  repo_public: {
    publisher: 'Federal Reserve Bank of New York',
    title: 'Reference guide to US repo and securities lending markets',
    url: 'https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr740.pdf',
  },
  return_public: {
    publisher: 'FINRA',
    title: 'Understanding bond yield and return',
    url: 'https://www.finra.org/investors/insights/bond-yield-return',
  },
  carry_public: {
    publisher: 'Wharton · Jacobs Levy Center',
    title: 'Carry and Trend in Lots of Places',
    url: 'https://jacobslevycenter.wharton.upenn.edu/wp-content/uploads/2015/05/Carry-and-Trend-in-Lots-of-Places.pdf',
  },
  roll_down_public: {
    publisher: 'PIMCO',
    title: 'Bond fundamentals',
    url: 'https://www.pimco.com/gbl/en/resources/education/everything-you-need-to-know-about-bonds',
  },
  mortgage_rate_public: {
    publisher: 'Fannie Mae',
    title: 'What determines the rate on a 30-year mortgage?',
    url: 'https://www.fanniemae.com/research-and-insights/publications/housing-insights/rate-30-year-mortgage',
  },
  curve_policy_public: {
    publisher: 'Reserve Bank of Australia',
    title: 'Bonds and the yield curve',
    url: 'https://www.rba.gov.au/education/resources/explainers/bonds-and-the-yield-curve.html',
  },
  term_premium_public: {
    publisher: 'Federal Reserve Bank of New York',
    title: 'Treasury term premia',
    url: 'https://libertystreeteconomics.newyorkfed.org/2014/05/treasury-term-premia-1961-present/',
  },
  balance_sheet_public: {
    publisher: 'Federal Reserve',
    title: 'Open market operations and balance-sheet tools',
    url: 'https://www.federalreserve.gov/monetarypolicy/bst_openmarketops.htm',
  },
  ratings_public: {
    publisher: 'SEC',
    title: 'The ABCs of Credit Ratings',
    url: 'https://www.sec.gov/investor/alerts/ib_creditratings.pdf',
  },
  expected_loss_public: {
    publisher: 'Basel Committee on Banking Supervision',
    title: 'CRE35 · Treatment of expected losses',
    url: 'https://www.bis.org/committees/bcbs/basel-framework/standard/cre/35/inforce/2023-01-01/published/2020-03-27',
  },
};

export const mechanism_topics = [
  {
    id: 'household_access',
    branch: 'basics',
    title: 'Affordability and access',
    concepts: ['affordability', 'dti', 'assumability'],
  },
  {
    id: 'refinancing_access',
    branch: 'prepayment',
    title: 'Who can refinance?',
    concepts: ['refinance_eligibility'],
  },
  {
    id: 'origination_market',
    branch: 'trading',
    title: 'From a quote to delivery',
    concepts: ['current_coupon', 'rate_lock', 'fallout'],
  },
  {
    id: 'funding_demand',
    branch: 'trading',
    title: 'Funding and investor demand',
    concepts: ['repo', 'haircut', 'supply_demand'],
  },
  {
    id: 'return_components',
    branch: 'valuation',
    title: 'Income, price and purchasing power',
    concepts: ['total_return', 'carry', 'roll_down', 'real_return'],
  },
  {
    id: 'rate_transmission',
    branch: 'curves',
    title: 'From policy to a mortgage quote',
    concepts: [
      'policy_rate',
      'term_premium',
      'qe_qt',
      'primary_secondary_spread',
    ],
  },
  {
    id: 'exposure_channels',
    branch: 'risk',
    title: 'Beyond one rate sensitivity',
    concepts: ['pipeline_hedging', 'margin_call', 'curve_shifts'],
  },
  {
    id: 'credit_assessment',
    branch: 'credit',
    title: 'Assessing credit outcomes',
    concepts: ['credit_rating', 'expected_loss', 'credit_migration'],
  },
];

type Entry = Omit<MortgageConcept, 'branch' | 'topic'>;
const entries: Entry[] = [
  {
    id: 'affordability',
    title: 'Housing affordability',
    subtitle: 'A price is only part of the payment',
    aliases: ['housing payment', 'monthly budget'],
    summary:
      'A household finances a balance, not a house-price index. Price, down payment, mortgage rate and term determine principal and interest; taxes, insurance and other expenses also consume the budget.',
    distinction:
      'Loan approval and a comfortable household budget answer different questions.',
    links: [
      {
        id: 'amortization',
        reason:
          'The payment formula translates a balance and rate into monthly debt service.',
      },
      {
        id: 'home_prices',
        reason:
          'A higher purchase price can require more cash or a larger financed balance.',
      },
      { id: 'dti', reason: 'Underwriting compares debt payments with income.' },
      {
        id: 'turnover',
        reason:
          'The cost of a replacement home can affect the decision to move.',
      },
    ],
    sources: ['affordability_public'],
    question: 'Does a lower mortgage rate guarantee a cheaper home purchase?',
    answer:
      'No. The price, amount borrowed and other housing costs may change too.',
  },
  {
    id: 'dti',
    title: 'Debt-to-income ratio',
    subtitle: 'Payments relative to income',
    aliases: ['DTI', 'debt to income'],
    summary:
      'DTI compares monthly debt payments with gross monthly income. It is one input into a lender’s assessment of repayment capacity. Limits and included obligations depend on the loan program.',
    distinction:
      'DTI describes payment burden; LTV describes borrowing relative to collateral value.',
    formula: {
      expression: 'DTI = monthly debt payments / gross monthly income',
      assumptions:
        'Use the same monthly period and the obligations required by the applicable underwriting definition. This is not a universal approval threshold.',
    },
    links: [
      {
        id: 'ltv',
        reason:
          'A borrower can have low LTV but high monthly payment obligations.',
      },
      {
        id: 'refinance_eligibility',
        reason: 'Repayment capacity may affect access to a new loan.',
      },
    ],
    sources: ['dti_public'],
    question: 'Can a high-income borrower still have a high DTI?',
    answer: 'Yes, if monthly debt payments are high relative to that income.',
  },
  {
    id: 'refinance_eligibility',
    title: 'Refinancing eligibility',
    subtitle: 'Wanting a new loan is not obtaining one',
    aliases: ['underwriting', 'refi eligibility', 'qualification'],
    summary:
      'A lower available rate creates an incentive, but the borrower must qualify under the relevant program. Income, credit, equity and documentation can matter. Some streamlined programs have different requirements.',
    distinction:
      'Incentive, eligibility and the effort of completing a refinance are separate filters.',
    links: [
      {
        id: 'incentive',
        reason:
          'Savings motivate an application but do not establish qualification.',
      },
      {
        id: 'ltv',
        reason:
          'Property value and debt balance affect equity available to support refinancing.',
      },
      {
        id: 'frictions',
        reason: 'Even an eligible borrower faces costs and effort.',
      },
      {
        id: 'prepayments',
        reason: 'Only a completed refinance pays off the old loan.',
      },
    ],
    sources: ['underwriting_public'],
    question: 'Will every borrower with an economic incentive refinance?',
    answer:
      'No. Qualification, costs, time and individual choices can prevent completion.',
  },
  {
    id: 'assumability',
    title: 'Mortgage assumption',
    subtitle: 'A buyer takes over an existing loan',
    aliases: ['assumable mortgage', 'loan assumption'],
    summary:
      'An approved assumption transfers an existing mortgage obligation to a new borrower under the applicable program. An attractive existing rate may help a sale, but the buyer must address qualification and any gap between the sale price and remaining loan balance.',
    distinction:
      'Assuming the seller’s loan differs from taking out a new loan at today’s rate. Availability is contract- and program-specific.',
    links: [
      {
        id: 'lock_in',
        reason: 'An assumable low-rate loan can change the cost of moving.',
      },
      {
        id: 'turnover',
        reason:
          'A property transfer need not always pay off an assumable loan.',
      },
      {
        id: 'affordability',
        reason:
          'An attractive rate may still leave a substantial equity gap to fund.',
      },
    ],
    sources: ['assumption_public', 'assumption_gap'],
    question: 'Does every home sale repay the seller’s mortgage?',
    answer:
      'Often, but a permitted and completed assumption can preserve the existing loan.',
  },
  {
    id: 'primary_secondary_spread',
    title: 'Primary–secondary spread',
    subtitle: 'Borrower pricing versus MBS pricing',
    aliases: ['primary secondary spread', 'origination margin'],
    summary:
      'This spread compares a borrower mortgage rate with a representative yield on newly produced agency MBS. Servicing, guarantee fees, origination costs, capacity and margins help explain the gap.',
    distinction:
      'The gap is neither pure lender profit nor an option-adjusted spread. The reference yield and quotation conventions must be specified.',
    links: [
      {
        id: 'current_coupon',
        reason: 'Current-coupon MBS is a common secondary-market reference.',
      },
      {
        id: 'servicing',
        reason:
          'Servicing compensation is part of the borrower-to-investor rate difference.',
      },
      {
        id: 'incentive',
        reason:
          'Refinancing decisions depend on the borrower’s available rate, not just the MBS yield.',
      },
    ],
    sources: ['primary_secondary_public'],
    question:
      'Does a decline in secondary MBS yields pass through one-for-one immediately?',
    answer: 'Not necessarily. The primary–secondary gap can change.',
  },
  {
    id: 'current_coupon',
    title: 'Current-coupon MBS',
    subtitle: 'A near-par secondary-market reference',
    aliases: ['current coupon', 'production coupon'],
    summary:
      'Current-coupon measures estimate the coupon or associated yield of agency MBS trading near par. They provide a reference for new mortgage production; the estimate depends on quotes and methodology.',
    distinction:
      'A current-coupon benchmark, a security’s fixed coupon and the pool’s WAC are different quantities.',
    links: [
      {
        id: 'tba',
        reason:
          'Agency TBA prices help establish the secondary-market reference.',
      },
      {
        id: 'wac',
        reason:
          'Borrower rates in a pool need not equal the coupon passed to investors.',
      },
      {
        id: 'price',
        reason:
          'Near-par pricing defines the reference, rather than a particular borrower quote.',
      },
    ],
    sources: ['primary_secondary_public'],
    question: 'Is current coupon the rate offered to every new borrower?',
    answer:
      'No. Borrower characteristics, costs and lender pricing also matter.',
  },
  {
    id: 'rate_lock',
    title: 'Mortgage rate lock',
    subtitle: 'A commitment before the loan closes',
    aliases: ['borrower rate lock', 'locked pipeline'],
    summary:
      'A lender commits to a quoted rate for a stated period, subject to the agreement’s conditions. Market rates can move between this commitment and the loan’s closing or sale.',
    distinction:
      'A rate lock protects a pending quote. Mortgage lock-in describes an existing homeowner’s reluctance to give up a low rate.',
    links: [
      {
        id: 'lock_in',
        reason:
          'Similar wording describes two different decisions and timelines.',
      },
      {
        id: 'fallout',
        reason:
          'Some locked applications do not complete as originally expected.',
      },
      {
        id: 'pipeline_hedging',
        reason: 'The commitment can create exposure before a loan is funded.',
      },
    ],
    sources: ['rate_lock_public'],
    question: 'Does a rate lock mean the loan has already closed?',
    answer: 'No. Closing and the lock agreement’s conditions still matter.',
  },
  {
    id: 'fallout',
    title: 'Pipeline fallout',
    subtitle: 'The uncertainty in locked applications',
    aliases: ['pull-through', 'pull through', 'loan fallout'],
    summary:
      'A locked application may fail to close or complete on different terms. Changes in borrower choices and market rates alter the amount and sensitivity of loans expected to be delivered.',
    distinction:
      'Locked face amount is not the same as expected funded exposure.',
    links: [
      {
        id: 'pipeline_hedging',
        reason: 'A changing completion forecast changes the hedge needed.',
      },
      {
        id: 'rate_lock',
        reason:
          'The original commitment sets the reference for expected completion.',
      },
    ],
    sources: ['pipeline_public'],
    question: 'Why update a hedge if no loan has funded yet?',
    answer:
      'Expected completion and rate exposure can change while applications remain open.',
  },
  {
    id: 'pipeline_hedging',
    title: 'Mortgage pipeline hedging',
    subtitle: 'Hedging loans that have not all closed',
    aliases: ['origination hedge', 'pipeline hedge'],
    summary:
      'Originators can use forward MBS trades to manage the rate exposure of expected loan deliveries. The hedge reflects projected completion, timing and sensitivity, rather than mechanically matching every locked dollar.',
    distinction:
      'A TBA hedge can reduce rate exposure while leaving delivery, fallout and basis risk.',
    links: [
      {
        id: 'tba',
        reason:
          'A forward TBA sale can offset part of the value change in expected mortgage production.',
      },
      {
        id: 'basis_risk',
        reason:
          'Actual loans and the hedge security need not move identically.',
      },
      {
        id: 'dv01',
        reason: 'Sensitivity helps translate exposure into hedge size.',
      },
    ],
    sources: ['pipeline_public', 'tba_hedge_public'],
    question:
      'Is the correct hedge always the total face value of locked loans?',
    answer: 'No. Expected completion and risk per dollar both matter.',
  },
  {
    id: 'repo',
    title: 'Repurchase financing',
    subtitle: 'Borrowing against securities',
    aliases: ['repo', 'repurchase agreement', 'reverse repo'],
    summary:
      'A repo exchanges securities for cash with an agreement to repurchase them. A financed MBS position faces both asset risk and funding risk. Repo and reverse repo describe opposite sides of the same transaction.',
    distinction:
      'A security can be long-lived while its financing must be renewed much sooner.',
    links: [
      {
        id: 'haircut',
        reason: 'The collateral buffer limits the cash advanced.',
      },
      {
        id: 'carry',
        reason:
          'Funding interest reduces income retained by a financed holder.',
      },
      {
        id: 'sofr',
        reason:
          'SOFR measures overnight Treasury repo financing, not every MBS borrower’s funding rate.',
      },
    ],
    sources: ['repo_public'],
    question: 'Does holding a guaranteed MBS remove funding risk?',
    answer: 'No. Financing can reprice or require additional collateral.',
  },
  {
    id: 'haircut',
    title: 'Collateral haircut',
    subtitle: 'The gap between collateral and cash',
    aliases: ['repo haircut', 'initial margin'],
    summary:
      'A haircut means less cash is advanced than the collateral’s market value. It provides a buffer for the cash lender and determines how much capital the borrower initially supplies.',
    distinction:
      'A haircut is a financing term, not a forecast of credit losses. Its denominator differs from a margin ratio.',
    formula: {
      expression: 'h = 1 − cash advanced / collateral market value',
      assumptions:
        'Here the haircut uses collateral market value as denominator. Other quoted margin conventions must be converted before comparison.',
    },
    links: [
      {
        id: 'repo',
        reason:
          'The repo contract specifies the financing and collateral terms.',
      },
      {
        id: 'margin_call',
        reason:
          'Collateral revaluation can create a need to restore the agreed buffer.',
      },
    ],
    sources: ['repo_public'],
    question: 'Does a 5% haircut imply a 5% expected loss?',
    answer: 'No. Funding protection and expected loss are different measures.',
  },
  {
    id: 'margin_call',
    title: 'Margin call',
    subtitle: 'A cash need before a credit loss',
    aliases: ['variation margin', 'collateral call'],
    summary:
      'A financing or derivative agreement can require extra cash or collateral after adverse valuation changes. The exact trigger depends on the contract, even when the underlying loans still pay.',
    distinction:
      'Liquidity to meet today’s call and eventual repayment of the asset are different risks.',
    links: [
      {
        id: 'liquidity',
        reason: 'Meeting a call can require cash reserves or asset sales.',
      },
      {
        id: 'price',
        reason:
          'A market-price decline can trigger a collateral shortfall without a default.',
      },
    ],
    sources: ['repo_public'],
    question: 'Must a bond default before its holder receives a margin call?',
    answer: 'No. Mark-to-market losses can be sufficient under the agreement.',
  },
  {
    id: 'total_return',
    title: 'Holding-period total return',
    subtitle: 'Income and value over the whole period',
    aliases: ['total return', 'holding period return'],
    summary:
      'Total return combines distributions, any reinvestment earnings and the ending investment value, relative to the starting value. For an amortizing MBS, returned principal reduces the remaining asset; it is not all profit.',
    distinction:
      'Coupon rate, yield and realized return are not interchangeable.',
    links: [
      {
        id: 'cash_flows',
        reason:
          'Separate interest from returned principal before interpreting distributions.',
      },
      {
        id: 'carry',
        reason:
          'Net running income explains only one component of the holding-period result.',
      },
      {
        id: 'roll_down',
        reason:
          'Aging along a curve can affect value under a stated unchanged-curve assumption.',
      },
      {
        id: 'reinvestment',
        reason:
          'Early cash receipts may earn a different rate after reinvestment.',
      },
      {
        id: 'real_return',
        reason: 'Inflation changes the purchasing power of the nominal result.',
      },
    ],
    sources: ['return_public', 'basics'],
    question:
      'Can positive coupon income coexist with a negative total return?',
    answer:
      'Yes. A loss in market value or other costs can outweigh the income.',
  },
  {
    id: 'carry',
    title: 'Carry and funding cost',
    subtitle: 'Income after paying for financing',
    aliases: ['net carry', 'funding cost', 'negative carry'],
    summary:
      'Here, carry means running income less funding cost; roll-down is shown separately. A financed investor compares the income retained from the security with the cost of borrowing to hold it.',
    distinction:
      'Carry conventions differ across desks and products. Positive carry does not ensure a positive total return.',
    links: [
      {
        id: 'repo',
        reason:
          'A higher repo rate can reduce carry without changing the bond’s coupon.',
      },
      {
        id: 'net_coupon',
        reason:
          'The investor receives the security coupon, not the full borrower note rate.',
      },
      {
        id: 'total_return',
        reason:
          'Price changes and other costs remain outside this running-income measure.',
      },
    ],
    sources: ['carry_public'],
    question: 'What can turn a fixed-coupon position’s carry negative?',
    answer:
      'For example, financing cost can rise above the income earned on the funded position.',
  },
  {
    id: 'roll_down',
    title: 'Yield-curve roll-down',
    subtitle: 'Aging along a stated curve',
    aliases: ['rolldown', 'roll down'],
    summary:
      'If a yield curve stays unchanged, a bond’s shorter remaining maturity may correspond to a different yield and price. This aging effect is often called roll-down. Mortgage cash-flow timing can change at the same time.',
    distinction:
      'Roll-down is different from coupon income and from an MBS dollar roll. It is conditional, not a promised gain.',
    links: [
      {
        id: 'spot_curve',
        reason: 'The curve’s shape determines the valuation effect of aging.',
      },
      {
        id: 'wal',
        reason:
          'Mortgage expected life can move differently from calendar maturity.',
      },
      {
        id: 'rolls',
        reason:
          'A dollar roll is a trading transaction, not simply aging along the yield curve.',
      },
    ],
    sources: ['roll_down_public'],
    question: 'Does passing time always create positive roll-down?',
    answer: 'No. Curve shape and changing cash-flow assumptions matter.',
  },
  {
    id: 'real_return',
    title: 'Real return',
    subtitle: 'The change in purchasing power',
    aliases: ['inflation adjusted return', 'nominal return'],
    summary:
      'Real return adjusts an investment’s nominal return for inflation over the same period. A positive nominal result can still purchase fewer goods and services.',
    distinction:
      'A quoted coupon does not by itself establish the investor’s inflation-adjusted result.',
    formula: {
      expression: 'Real return = (1 + nominal return) / (1 + inflation) − 1',
      assumptions:
        'Use decimal returns and inflation for the same holding period. This identity does not remove investment or currency risk.',
    },
    links: [
      {
        id: 'total_return',
        reason:
          'Start from the holding-period result rather than the coupon alone.',
      },
      {
        id: 'inflation_linked',
        reason:
          'Index-linked payments address a specified inflation measure, not every source of real-return risk.',
      },
    ],
    sources: ['return_public'],
    question: 'Is a 4% nominal return necessarily a purchasing-power gain?',
    answer: 'No. It depends on inflation over that same period.',
  },
  {
    id: 'policy_rate',
    title: 'Policy rates',
    subtitle: 'The short end is not the whole curve',
    aliases: ['policy rate', 'Fed funds', 'rate cut'],
    summary:
      'Central-bank policy directly shapes short-term money-market conditions. Longer-term yields also reflect the expected future rate path and compensation for risk. A mortgage quote contains further pricing components.',
    distinction:
      'A policy-rate change is not a one-for-one change in every borrowing rate.',
    links: [
      {
        id: 'treasury',
        reason:
          'Treasury yields reflect expectations beyond the current policy setting.',
      },
      {
        id: 'ois',
        reason:
          'OIS rates summarize pricing of future overnight-rate payments.',
      },
      {
        id: 'term_premium',
        reason:
          'Long-term yields include compensation that can move separately from expected short rates.',
      },
    ],
    sources: ['curve_policy_public', 'mortgage_rate_public'],
    question: 'Can long yields rise on the day of a policy-rate cut?',
    answer:
      'Yes. Expectations and risk compensation can move differently from the current policy rate.',
  },
  {
    id: 'term_premium',
    title: 'Term premium',
    subtitle: 'Compensation for holding duration',
    aliases: ['term premia', 'duration premium'],
    summary:
      'Term premium is the component of a longer-term yield attributed to compensation for bearing interest-rate risk rather than rolling short-term investments. It is usually estimated with a model and can be negative.',
    distinction:
      'The 10-year minus 2-year yield slope is observable; term premium is not directly read from that slope.',
    links: [
      {
        id: 'treasury',
        reason:
          'A Treasury yield can change because the premium changes, even with unchanged expected short rates.',
      },
      {
        id: 'qe_qt',
        reason:
          'Changes in privately held duration can affect the compensation investors require.',
      },
      {
        id: 'model_risk',
        reason:
          'Different models can produce different term-premium estimates.',
      },
    ],
    sources: ['term_premium_public'],
    question:
      'Can you measure term premium just by subtracting two quoted yields?',
    answer:
      'No. Expected short rates and risk compensation must be separated using assumptions or a model.',
  },
  {
    id: 'qe_qt',
    title: 'Asset purchases and runoff',
    subtitle: 'Who holds the duration?',
    aliases: ['QE', 'QT', 'quantitative easing', 'balance sheet runoff'],
    summary:
      'Central-bank purchases change the securities held by the public. Runoff occurs when repayments are not fully reinvested under the applicable policy. MBS principal payments influence how quickly mortgage holdings can decline.',
    distinction:
      'Runoff and outright sales are different operations. A balance-sheet announcement is not a mechanical forecast of spreads.',
    links: [
      {
        id: 'supply_demand',
        reason:
          'Changing official holdings changes what private investors must absorb.',
      },
      {
        id: 'prepayments',
        reason:
          'MBS cash receipts depend partly on borrowers returning principal early.',
      },
      {
        id: 'term_premium',
        reason:
          'The quantity of duration borne by investors can affect required compensation.',
      },
    ],
    sources: ['balance_sheet_public'],
    question: 'Does runoff necessarily mean selling bonds in the market?',
    answer:
      'No. Holdings can shrink through principal payments without an outright sale.',
  },
  {
    id: 'supply_demand',
    title: 'Supply and investor demand',
    subtitle: 'The price that attracts a buyer',
    aliases: ['investor flows', 'MBS demand', 'net issuance'],
    summary:
      'Issuance brings securities to market; principal repayments retire them. Investor demand and the risks investors can hold help determine the price that clears the market.',
    distinction:
      'A change in demand can affect spreads without a change in collateral credit quality. Other influences may offset it.',
    links: [
      {
        id: 'current_coupon',
        reason:
          'Demand for new agency production influences its secondary-market pricing.',
      },
      {
        id: 'liquidity',
        reason:
          'The ability to trade and fund positions shapes investors’ willingness to hold them.',
      },
      {
        id: 'spreads',
        reason:
          'Required compensation can reflect market demand as well as credit and option risk.',
      },
    ],
    sources: ['mortgage_rate_public', 'curve_policy_public'],
    question: 'Does unchanged borrower credit imply an unchanged MBS spread?',
    answer: 'No. Demand, liquidity and option valuation can change too.',
  },
  {
    id: 'curve_shifts',
    title: 'Parallel and nonparallel shifts',
    subtitle: 'Rates need not move together',
    aliases: [
      'yield curve twist',
      'steepening',
      'flattening',
      'level slope curvature',
    ],
    summary:
      'A parallel move shifts yields similarly across maturities. Steepening, flattening and curvature changes move different sections differently. Securities with different payment schedules need not respond alike.',
    distinction:
      'A near-zero aggregate DV01 can conceal offsetting exposures at different maturities.',
    links: [
      {
        id: 'key_rate',
        reason: 'Key-rate sensitivities locate exposure along the curve.',
      },
      {
        id: 'dv01',
        reason:
          'A single parallel-shift sensitivity cannot describe every curve shape change.',
      },
      {
        id: 'spot_curve',
        reason:
          'Each payment is exposed to the relevant part of the discount curve.',
      },
    ],
    sources: ['curve_policy_public'],
    question:
      'Does matching total DV01 guarantee a hedge against a curve twist?',
    answer:
      'No. The maturity distribution of sensitivity must also be considered.',
  },
  {
    id: 'credit_rating',
    title: 'Credit ratings',
    subtitle: 'An opinion about credit risk',
    aliases: ['investment grade', 'credit rating', 'AAA'],
    summary:
      'A rating expresses an assessment of relative creditworthiness under a methodology. It can inform credit analysis but does not summarize every risk in a security.',
    distinction:
      'A high rating is not a repayment guarantee or protection from price, liquidity and prepayment risk.',
    links: [
      {
        id: 'credit_migration',
        reason:
          'The assessment can change as information and conditions change.',
      },
      {
        id: 'default',
        reason:
          'Default risk is central to credit analysis but distinct from an observed rating.',
      },
      {
        id: 'agency',
        reason:
          'A contractual guarantee and a rating are different sources of information.',
      },
    ],
    sources: ['ratings_public'],
    question: 'Can a highly rated bond lose market value?',
    answer:
      'Yes. Interest rates, spreads and liquidity can change without a default.',
  },
  {
    id: 'expected_loss',
    title: 'Expected collateral loss',
    subtitle: 'Probability, severity and exposure',
    aliases: ['EL', 'PD', 'LGD', 'EAD', 'expected credit loss'],
    summary:
      'A simple loan-level expected-loss framework combines default probability, loss conditional on default, and exposure at default. Definitions and the time horizon must be consistent.',
    distinction:
      'Loan expected loss does not directly determine a tranche’s loss. Timing, dependence between defaults and the waterfall still matter.',
    formula: {
      expression: 'EL = PD × LGD × EAD',
      assumptions:
        'A simplified loan-level framework. PD and conditional loss/exposure assumptions must be consistent over one horizon. Do not apply it as a securitization-tranche pricing or loss formula.',
    },
    links: [
      {
        id: 'default',
        reason:
          'The probability of default is one input, rather than the entire expected loss.',
      },
      {
        id: 'severity',
        reason: 'A default need not destroy the full exposure.',
      },
      {
        id: 'subordination',
        reason:
          'The structure distributes collateral losses unevenly among classes.',
      },
    ],
    sources: ['expected_loss_public'],
    question:
      'Do two pools with equal expected losses imply equal senior-tranche risk?',
    answer:
      'No. The distribution and timing of losses, including joint defaults, can differ.',
  },
  {
    id: 'credit_migration',
    title: 'Credit migration',
    subtitle: 'Credit changes before default',
    aliases: ['upgrade', 'downgrade', 'rating transition'],
    summary:
      'Credit migration describes movement between credit states or ratings. A deterioration may affect market pricing well before a missed payment, and an upgrade need not produce an identical price response in every security.',
    distinction:
      'A downgrade is not a default. The same rating label does not make different asset classes interchangeable.',
    links: [
      {
        id: 'credit_rating',
        reason:
          'Rating transitions are one way to observe changes in credit assessment.',
      },
      {
        id: 'spreads',
        reason:
          'Investors may require different compensation when credit prospects change.',
      },
      {
        id: 'crt',
        reason:
          'Mortgage credit-transfer investors bear designated credit outcomes rather than only rate exposure.',
      },
    ],
    sources: ['ratings_public'],
    question: 'Can credit risk affect a bond before any missed payment?',
    answer: 'Yes. Expectations can change required returns and market prices.',
  },
];

export const mechanism_concepts: MortgageConcept[] = entries.map((entry) => {
  const topic = mechanism_topics.find((item) =>
    item.concepts.includes(entry.id),
  );
  if (!topic) throw new Error(`Unassigned mechanism concept: ${entry.id}`);
  return { ...entry, branch: topic.branch, topic: topic.id };
});

export type MechanismModel = {
  id: string;
  title: string;
  description: string;
  premise: string;
  steps: string[];
  explanations: string[];
  boundary: string;
};
export const mechanism_models: MechanismModel[] = [
  {
    id: 'policy_to_prepayment',
    title: 'Why a rate cut may not lower a mortgage quote',
    description:
      'Follow policy through bond pricing, lender quotes and the borrower’s decision.',
    premise:
      'A headline rate cut passes through several markets and decisions before it becomes a payment on someone’s mortgage.',
    steps: [
      'policy_rate',
      'treasury',
      'current_coupon',
      'primary_secondary_spread',
      'incentive',
      'refinance_eligibility',
      'prepayments',
    ],
    explanations: [
      'Policy changes short-term conditions. Expectations about future policy can already be priced in.',
      'Long-term Treasury yields also reflect the expected rate path and term premium, so they need not follow the current policy rate.',
      'Agency MBS pricing adds compensation for mortgage-specific risks and responds to investor demand.',
      'The rate reaching the borrower also reflects origination, servicing, guarantee costs and margins.',
      'Compare the new borrower quote with the existing mortgage, accounting for the cost of refinancing.',
      'A financially attractive refinance still needs to be available to this borrower under the relevant program.',
      'Only a completed payoff returns principal to the old mortgage pool. The investor then has a different cash-flow schedule.',
    ],
    boundary:
      'This is a conditional transmission path, not a forecast. Expectations, term premium, MBS valuation, lender capacity and borrower circumstances can each offset a policy move.',
  },
  {
    id: 'rate_lock_to_hedge',
    title: 'From a rate lock to a TBA hedge',
    description:
      'Connect the borrower’s quote to the originator’s changing market exposure.',
    premise:
      'A lender can have mortgage exposure before it has funded the mortgage.',
    steps: ['rate_lock', 'fallout', 'pipeline_hedging', 'tba', 'basis_risk'],
    explanations: [
      'The lender commits to a quote for a limited period while market prices can move.',
      'Some applications will not complete on the expected terms. Pull-through estimates determine how much exposure is likely to remain.',
      'The hedge is sized against expected delivery and sensitivity, and updated as those expectations change.',
      'Forward TBA sales can offset part of the rate-driven value change in expected mortgage production.',
      'The eventual loans and deliverable securities may differ from the hedge. Residual basis risk remains even with matched aggregate sensitivity.',
    ],
    boundary:
      'This describes one common mechanism, not every lender’s hedge. Contract terms, delivery eligibility, fallout and hedge instruments determine the remaining exposure.',
  },
  {
    id: 'funding_to_liquidity',
    title: 'Why a performing bond can create a cash problem',
    description:
      'Separate the asset’s payments from the cash needed to finance it.',
    premise:
      '“The borrowers are still paying” does not answer whether a leveraged holder can meet today’s financing obligations.',
    steps: ['repo', 'haircut', 'margin_call', 'liquidity', 'spreads'],
    explanations: [
      'A holder finances securities through a repurchase agreement, with terms that may mature before the asset.',
      'Cash advanced is below collateral value. The difference is an initial buffer, not a guarantee against subsequent price changes.',
      'If valuations or permitted financing terms change, the agreement can require more cash or collateral.',
      'The holder may use reserves, obtain other financing or sell assets. A need to sell quickly makes market liquidity important.',
      'Limited willingness to hold or finance securities can change required spreads, even without new collateral defaults.',
    ],
    boundary:
      'Margin requirements are contractual. Unleveraged holders, different collateral agreements and available cash reserves can lead to very different outcomes.',
  },
  {
    id: 'income_to_real_return',
    title: 'Why coupon income is not the whole return',
    description: 'Decompose receipts, funding, valuation and purchasing power.',
    premise:
      'These are complementary parts of a return analysis. They are not successive causes of one another.',
    steps: ['cash_flows', 'total_return', 'carry', 'roll_down', 'real_return'],
    explanations: [
      'Separate interest income from returned principal. Receiving principal early also leaves a smaller investment outstanding.',
      'Combine receipts and ending value with the initial investment. State the holding period and whether financing, fees and reinvestment are included.',
      'For a financed position, compare running income with funding cost. Here this is called carry, with roll-down kept separate.',
      'Under an unchanged curve, aging can change value. For MBS, changing expected payment timing makes a simple bullet-bond analogy incomplete.',
      'Finally, compare the nominal result with inflation over the same period to assess purchasing power.',
    ],
    boundary:
      'Do not add overlapping attribution measures or count returned principal as profit. A higher coupon, positive carry or favorable roll-down does not guarantee a positive total return.',
  },
  {
    id: 'dv01_residual_risks',
    title: 'What a DV01 hedge leaves behind',
    description:
      'Move from one sensitivity to curve, basis and mortgage risks.',
    premise:
      'A single risk number describes a particular shock. It cannot describe every way a portfolio can change.',
    steps: [
      'curve_shifts',
      'key_rate',
      'treasury_hedge',
      'basis_risk',
      'spread_duration',
    ],
    explanations: [
      'Yields at different maturities can move by different amounts or in different directions.',
      'Key-rate sensitivities show where exposure sits, including offsets hidden by a single total DV01.',
      'Treasury positions can be chosen to offset selected rate exposures. Hedge sizing still depends on the assumed shocks.',
      'Mortgage and Treasury prices do not move identically. Mortgage-specific spreads and changing cash flows remain.',
      'Spread duration isolates sensitivity to the chosen spread under stated assumptions. It complements rate risk instead of replacing it.',
    ],
    boundary:
      'Prepayment, volatility and cash-flow assumptions can change the sensitivities themselves. A hedge must be reassessed as the exposure changes.',
  },
  {
    id: 'loss_to_tranche',
    title: 'From collateral losses to tranche outcomes',
    description:
      'Connect loan credit risk with the structure that allocates losses.',
    premise:
      'The loss on a pool and the loss on a particular bond are related, but they are not the same object.',
    steps: [
      'default',
      'expected_loss',
      'subordination',
      'waterfall',
      'seniority',
    ],
    explanations: [
      'Default is a credit event; recovery determines how much exposure is ultimately lost.',
      'A loan-level framework combines default probability, conditional severity and exposure over a consistent horizon.',
      'Junior protection can absorb losses before more senior classes, subject to the deal’s rules and available protection.',
      'The waterfall determines how receipts, shortfalls and losses are allocated over time.',
      'A class’s position in that order affects its outcome. Equal average collateral loss does not imply equal risk for every class.',
    ],
    boundary:
      'A pool’s average expected loss is insufficient for tranche analysis. Joint defaults, concentration, recovery timing and structural triggers also matter.',
  },
];

// Every entry link is a readable relationship, with a type and concise label.
const explicit_edges: Array<
  [string, string, string, string, MortgageRelationship['kind']?]
> = [
  [
    'tba',
    'basis_risk',
    'imperfect hedge match',
    'A generic TBA hedge need not match the rate and spread behavior of a particular pool or loan pipeline.',
  ],
  [
    'liquidity',
    'spreads',
    'changes compensation',
    'Difficulty trading or financing a security can change the spread investors require, even without a new default.',
  ],
  [
    'subordination',
    'waterfall',
    'implemented by rules',
    'Subordination protects classes through the contractual order for allocating receipts, shortfalls and losses.',
    'definition',
  ],
  [
    'waterfall',
    'seniority',
    'allocates by priority',
    'A class’s priority must be read from the transaction waterfall, including its conditions and triggers.',
    'definition',
  ],
  [
    'treasury',
    'current_coupon',
    'adds mortgage risks',
    'Agency MBS pricing reflects mortgage-specific option and market risks in addition to a government-rate reference.',
  ],
  [
    'incentive',
    'refinance_eligibility',
    'requires access too',
    'A borrower can have an economic incentive while being unable to qualify for the available refinance program.',
  ],
  [
    'carry',
    'roll_down',
    'separate return effects',
    'Under the convention used here, net running income and curve roll-down are separate attribution effects.',
    'comparison',
  ],
  [
    'roll_down',
    'real_return',
    'nominal versus real',
    'A nominal valuation gain from aging is still distinct from a holding-period gain in purchasing power.',
    'comparison',
  ],
  [
    'basis_risk',
    'spread_duration',
    'measures one residual',
    'Spread duration measures one form of residual price sensitivity with the benchmark curve held fixed.',
    'measurement',
  ],
  [
    'affordability',
    'seasonality',
    'budget and timing',
    'Household budgets influence buying capacity, while the seasonal pattern of transactions affects when turnover-related payoffs occur.',
    'comparison',
  ],
  [
    'refinance_eligibility',
    'burnout',
    'helps explain selection',
    'Repeated refinancing opportunities can leave a pool whose remaining borrowers have less ability or willingness to refinance.',
  ],
  [
    'prepayments',
    'supply_demand',
    'reduces outstanding supply',
    'Principal repayments reduce outstanding MBS, while new origination adds securities; both matter for the supply investors absorb.',
  ],
  [
    'credit_migration',
    'corporate',
    'changes credit pricing',
    'Corporate bond valuations can respond to a deterioration in credit prospects before an actual default.',
  ],
];
const relation_labels: Record<string, string[]> = {
  affordability: [
    'payment mechanics',
    'sets the purchase cost',
    'tests payment capacity',
    'influences moving',
  ],
  dti: ['income versus collateral', 'informs qualification'],
  refinance_eligibility: [
    'access versus savings',
    'depends on equity',
    'access versus effort',
    'enables a payoff',
  ],
  assumability: [
    'can ease rate lock-in',
    'may avoid payoff',
    'leaves an equity gap',
  ],
  primary_secondary_spread: [
    'uses a market reference',
    'includes servicing cost',
    'changes the quote',
  ],
  current_coupon: [
    'uses TBA pricing',
    'different rate measures',
    'near-par reference',
  ],
  rate_lock: [
    'different meanings',
    'uncertain completion',
    'creates rate exposure',
  ],
  fallout: ['changes expected exposure', 'starts from a commitment'],
  pipeline_hedging: [
    'uses forward sales',
    'leaves a mismatch',
    'sizes sensitivity',
  ],
  repo: ['requires a buffer', 'costs reduce income', 'different funding rates'],
  haircut: ['a contract term', 'buffer may need restoring'],
  margin_call: ['requires cash', 'triggered by revaluation'],
  total_return: [
    'counts receipts and value',
    'includes running income',
    'includes aging effects',
    'depends on reinvestment',
    'adjusts purchasing power',
  ],
  carry: [
    'deducts financing cost',
    'starts with net income',
    'only part of return',
  ],
  roll_down: [
    'depends on curve shape',
    'timing can change',
    'different meaning of roll',
  ],
  real_return: ['adjusts nominal outcome', 'indexing is not all risk'],
  policy_rate: [
    'transmits through expectations',
    'prices future overnight rates',
    'distinct yield components',
  ],
  term_premium: [
    'a component of yield',
    'responds to held duration',
    'requires estimation',
  ],
  qe_qt: [
    'changes private supply',
    'runoff depends on paydowns',
    'changes held duration',
  ],
  supply_demand: [
    'affects production pricing',
    'depends on market access',
    'changes compensation',
  ],
  curve_shifts: [
    'locates the exposure',
    'one number is incomplete',
    'changes discount rates',
  ],
  credit_rating: [
    'assessment can change',
    'opinion versus event',
    'rating versus guarantee',
  ],
  expected_loss: [
    'includes default probability',
    'includes conditional loss',
    'losses allocated by class',
  ],
  credit_migration: [
    'changes the assessment',
    'changes required returns',
    'affects credit exposure',
  ],
};
const comparisons = new Set([
  'dti:ltv',
  'refinance_eligibility:incentive',
  'refinance_eligibility:frictions',
  'current_coupon:wac',
  'rate_lock:lock_in',
  'repo:sofr',
  'roll_down:rolls',
  'credit_rating:default',
  'credit_rating:agency',
]);
export const mechanism_relationships: MortgageRelationship[] = [
  ...mechanism_concepts.flatMap((node) =>
    node.links.map((link, index) => ({
      id: `model_${node.id}__${link.id}`,
      source: node.id,
      target: link.id,
      label: relation_labels[node.id][index],
      reason: link.reason,
      kind: (comparisons.has(`${node.id}:${link.id}`)
        ? 'comparison'
        : 'mechanism') as MortgageRelationship['kind'],
    })),
  ),
  ...explicit_edges.map(
    ([source, target, label, reason, kind = 'mechanism']) => ({
      id: `model_${source}__${target}`,
      source,
      target,
      label,
      reason,
      kind,
    }),
  ),
];
