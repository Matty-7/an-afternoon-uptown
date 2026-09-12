export interface MortgageInputs {
  original_balance: number;
  annual_rate: number;
  term_months: number;
  annual_cpr: number;
}

export interface MortgageMonth {
  month: number;
  balance: number;
  scheduled_principal: number;
  prepaid_principal: number;
  interest: number;
}

export function scheduled_payment(balance: number, monthly_rate: number, months: number): number {
  return monthly_rate === 0
    ? balance / months
    : balance * monthly_rate / -Math.expm1(-months * Math.log1p(monthly_rate));
}

export function project_mortgage_pool(inputs: MortgageInputs) {
  const { original_balance, annual_rate, term_months, annual_cpr } = inputs;
  if (!Object.values(inputs).every(Number.isFinite) || original_balance <= 0 ||
      annual_rate < 0 || annual_rate > 1 || annual_cpr < 0 || annual_cpr > 1 ||
      !Number.isInteger(term_months) || term_months < 1 || term_months > 600) {
    throw new RangeError('Use a positive balance, valid rates and a whole monthly term.');
  }
  const monthly_rate = annual_rate / 12;
  const smm = 1 - Math.pow(1 - annual_cpr, 1 / 12);
  const initial_payment = scheduled_payment(original_balance, monthly_rate, term_months);
  const months: MortgageMonth[] = [{ month: 0, balance: original_balance,
    scheduled_principal: 0, prepaid_principal: 0, interest: 0 }];
  let balance = original_balance;
  let weighted_principal = 0;
  let total_interest = 0;
  for (let month = 1; month <= term_months; month++) {
    const interest = balance * monthly_rate;
    // Remaining loans keep their original term; aggregate payments shrink as loans exit.
    const payment = scheduled_payment(balance, monthly_rate, term_months - month + 1);
    const scheduled_principal = month === term_months ? balance
      : Math.min(balance, Math.max(0, payment - interest));
    const prepaid_principal = (balance - scheduled_principal) * smm;
    balance = Math.max(0, balance - scheduled_principal - prepaid_principal);
    weighted_principal += month / 12 * (scheduled_principal + prepaid_principal);
    total_interest += interest;
    months.push({ month, balance, scheduled_principal, prepaid_principal, interest });
  }
  return { months, initial_payment, total_interest, weighted_average_life: weighted_principal / original_balance };
}
