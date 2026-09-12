'use client';

import { useMemo, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { project_mortgage_pool, type MortgageMonth } from '@/lib/mortgage_pool';

const defaults = { balance: '1000000', rate: '6', years: '30', cpr: '6' };
const controls = [
  { key: 'balance', label: 'Original pool balance', unit: '$', min: 100000, max: 10000000, step: 10000 },
  { key: 'rate', label: 'Annual note rate', unit: '%', min: 0, max: 15, step: 0.25 },
  { key: 'years', label: 'Original term', unit: 'years', min: 1, max: 40, step: 1 },
  { key: 'cpr', label: 'Annual CPR', unit: '%', min: 0, max: 50, step: 1 },
] as const;
type InputKey = keyof typeof defaults;
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const short_money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 });
const decimal = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

function input_error(key: InputKey, raw: string): string {
  const control = controls.find((item) => item.key === key)!;
  const value = Number(raw);
  if (!raw.trim() || !Number.isFinite(value) || value < control.min || value > control.max) {
    return `Enter ${decimal.format(control.min)} to ${decimal.format(control.max)} ${control.unit}.`;
  }
  return key === 'years' && !Number.isInteger(value) ? 'Enter a whole number of years.' : '';
}

function curve_path(months: MortgageMonth[], original_balance: number): string {
  const final_month = months.length - 1;
  return months.map((row, index) => `${index ? 'L' : 'M'}${row.month / final_month * 600},${280 * (1 - row.balance / original_balance)}`).join(' ');
}

export function MortgageLab() {
  const [raw_inputs, set_raw_inputs] = useState(defaults);
  const [valid_inputs, set_valid_inputs] = useState(defaults);
  const has_error = controls.some(({ key }) => input_error(key, raw_inputs[key]));
  const update_input = (key: InputKey, value: string) => {
    const next_inputs = { ...raw_inputs, [key]: value };
    set_raw_inputs(next_inputs);
    if (controls.every(({ key: input_key }) => !input_error(input_key, next_inputs[input_key]))) {
      set_valid_inputs(next_inputs);
    }
  };
  const { scenario, baseline } = useMemo(() => {
    const inputs = { original_balance: Number(valid_inputs.balance), annual_rate: Number(valid_inputs.rate) / 100,
      term_months: Number(valid_inputs.years) * 12, annual_cpr: Number(valid_inputs.cpr) / 100 };
    return { scenario: project_mortgage_pool(inputs), baseline: project_mortgage_pool({ ...inputs, annual_cpr: 0 }) };
  }, [valid_inputs]);
  const principal = Number(valid_inputs.balance);
  const cpr = Number(valid_inputs.cpr);
  const years = Number(valid_inputs.years);
  const life_difference = baseline.weighted_average_life - scenario.weighted_average_life;

  return (
    <section className="mortgage-workbench" aria-label="Mortgage pool experiment">
      <p className="mortgage-mobile-result"><strong>{scenario.weighted_average_life.toFixed(2)} years</strong><span>Weighted-average life<br />{baseline.weighted_average_life.toFixed(2)} years with no prepayments</span></p>
      <div className="mortgage-controls">
        <div className="mortgage-controls-heading"><h2>Set the assumptions.</h2><button type="button" onClick={() => {
          set_raw_inputs(defaults); set_valid_inputs(defaults);
        }}>Reset</button></div>
        {controls.map((control) => {
          const error = input_error(control.key, raw_inputs[control.key]);
          const label_id = `mortgage-${control.key}-label`;
          const error_id = `mortgage-${control.key}-error`;
          return (
            <div className="mortgage-control" key={control.key}>
              <label id={label_id} htmlFor={`mortgage-${control.key}`}>{control.label} <span>({control.unit})</span></label>
              <Input id={`mortgage-${control.key}`} type="number" min={control.min} max={control.max}
                step={control.key === 'years' ? 1 : 'any'} inputMode="decimal" value={raw_inputs[control.key]}
                aria-invalid={Boolean(error)} aria-describedby={error ? error_id : undefined}
                onChange={(event) => update_input(control.key, event.target.value)} />
              <Slider value={[Number(valid_inputs[control.key])]} min={control.min} max={control.max}
                step={control.step} aria-labelledby={label_id}
                onValueChange={(value) => update_input(control.key, String(Array.isArray(value) ? value[0] : value))} />
              <div className="mortgage-range" aria-hidden="true"><span>{decimal.format(control.min)}</span><span>{decimal.format(control.max)}</span></div>
              {error && <p className="mortgage-error" id={error_id}>{error}</p>}
            </div>
          );
        })}
        <p className="mortgage-control-note">CPR is the annualized rate of unscheduled principal repayment. Try moving it first.</p>
        {has_error && <output className="mortgage-error">Showing the last valid inputs.</output>}
      </div>

      <div className="mortgage-results">
        <figure className="mortgage-figure" aria-labelledby="balance-heading">
          <div className="mortgage-chart-heading"><h2 id="balance-heading">Outstanding principal</h2><span>Pool balance ($)</span></div>
          <div className="mortgage-legend"><span><i />Selected CPR · {decimal.format(cpr)}%</span><span><i className="baseline" />No prepayments · 0% CPR</span></div>
          <div className="mortgage-chart">
            <div className="mortgage-y-axis" aria-hidden="true">{[1, .75, .5, .25, 0].map((part) => <span key={part}>{short_money.format(principal * part)}</span>)}</div>
            <div className="mortgage-plot">
              <svg viewBox="0 0 600 280" preserveAspectRatio="none" aria-labelledby="mortgage-chart-title mortgage-chart-description">
                <title id="mortgage-chart-title">{`Mortgage pool principal over ${years} years`}</title>
                <desc id="mortgage-chart-description">{`The solid line shows ${cpr}% annual CPR; the dashed line shows no prepayments. ${cpr === 0 ? 'The two paths are identical.' : `The selected scenario returns principal ${life_difference.toFixed(2)} years earlier on average.`} Exact annual balances are available in the table below.`}</desc>
                {[0, 70, 140, 210, 280].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} className="mortgage-gridline" vectorEffect="non-scaling-stroke" />)}
                <path d={curve_path(baseline.months, principal)} className="mortgage-baseline" vectorEffect="non-scaling-stroke" />
                <path d={curve_path(scenario.months, principal)} className="mortgage-scenario" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="mortgage-x-axis" aria-hidden="true">{[0, .25, .5, .75, 1].map((part) => <span key={part}>{decimal.format(years * part)}</span>)}</div>
            </div>
          </div>
          <p className="mortgage-axis-caption">Years from origination</p>
          <figcaption>{cpr === 0 ? 'At 0% CPR, the two paths are identical.' :
            <>At {decimal.format(cpr)}% CPR, principal returns <strong>{life_difference.toFixed(2)} years earlier on average</strong> than with no prepayments.</>}
          </figcaption>
        </figure>

        <dl className="mortgage-metrics">
          <div><dt>Weighted-average life</dt><dd>{scenario.weighted_average_life.toFixed(2)} <span>years</span></dd><p>Average time until principal is returned.</p></div>
          <div><dt>Initial monthly P&amp;I</dt><dd>{money.format(scenario.initial_payment)}</dd><p>First-month scheduled principal and interest.</p></div>
          <div><dt>Total interest</dt><dd>{money.format(scenario.total_interest)}</dd><p>Undiscounted interest over the pool’s life.</p></div>
        </dl>
        <details className="mortgage-table-details">
          <summary>View annual balances</summary>
          <table><caption>Outstanding principal at each year end. Amounts in US dollars.</caption>
            <thead><tr><th scope="col">Year</th><th scope="col">Selected CPR</th><th scope="col">No prepayments</th></tr></thead>
            <tbody>{scenario.months.filter((row) => row.month % 12 === 0).map((row) =>
              <tr key={row.month}><th scope="row">{row.month / 12}</th><td>{money.format(row.balance)}</td><td>{money.format(baseline.months[row.month].balance)}</td></tr>)}</tbody>
          </table>
        </details>
      </div>
    </section>
  );
}
