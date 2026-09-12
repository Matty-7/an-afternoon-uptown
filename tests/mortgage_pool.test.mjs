import test from 'node:test';
import assert from 'node:assert/strict';
import { project_mortgage_pool } from '../lib/mortgage_pool.ts';

const inputs = { original_balance: 1000000, annual_rate: 0.06, term_months: 360, annual_cpr: 0.06 };
const close = (actual, expected, tolerance = 0.000001) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

test('pool balances match the independently derived survival-adjusted amortization formula', () => {
  for (const rate of [0, .000001, .06, .15]) for (const cpr of [0, .06, .5, 1]) {
    const result = project_mortgage_pool({ ...inputs, annual_rate: rate, annual_cpr: cpr });
    const monthly_rate = rate / 12;
    let principal_returned = 0;
    for (const row of result.months) {
      const scheduled_balance = rate === 0 ? inputs.original_balance * (1 - row.month / 360)
        : inputs.original_balance * Math.exp(row.month * Math.log1p(monthly_rate)) *
          Math.expm1((360 - row.month) * Math.log1p(monthly_rate)) / Math.expm1(360 * Math.log1p(monthly_rate));
      close(row.balance, scheduled_balance * Math.pow(1 - cpr, row.month / 12), 0.00002);
      assert.ok(row.balance >= 0 && Number.isFinite(row.interest));
      principal_returned += row.scheduled_principal + row.prepaid_principal;
    }
    close(principal_returned, inputs.original_balance);
    close(result.months.at(-1).balance, 0);
  }
});

test('a zero-rate no-prepayment pool returns equal principal every month', () => {
  const result = project_mortgage_pool({ ...inputs, annual_rate: 0, annual_cpr: 0 });
  close(result.total_interest, 0);
  close(result.initial_payment, 1000000 / 360);
  close(result.weighted_average_life, 361 / 24);
});

test('faster prepayments shorten average life and interest without changing initial scheduled P&I', () => {
  const slow = project_mortgage_pool({ ...inputs, annual_cpr: 0 });
  const fast = project_mortgage_pool({ ...inputs, annual_cpr: .5 });
  assert.ok(fast.weighted_average_life < slow.weighted_average_life);
  assert.ok(fast.total_interest < slow.total_interest);
  close(fast.initial_payment, slow.initial_payment);
  close(slow.initial_payment, 5995.505251527569, 0.000001);
});

test('invalid inputs are rejected before projection', () => {
  for (const invalid of [{ original_balance: 0 }, { annual_cpr: 1.1 }, { annual_rate: NaN }, { term_months: 1.5 }]) {
    assert.throws(() => project_mortgage_pool({ ...inputs, ...invalid }), RangeError);
  }
});
