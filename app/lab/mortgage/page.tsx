import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { BrandMark } from '@/components/brand_mark';
import { MortgageLab } from '@/components/mortgage_lab';
import { pageMetadata } from '@/lib/seo';
import './mortgage.css';

export const metadata: Metadata = pageMetadata(
  'Mortgage Lab | Jingheng Huan',
  'Explore how prepayments change a mortgage pool’s cash flows and average life.',
  '/lab/mortgage',
);

export default function MortgagePage() {
  return (
    <main className="mortgage-page" id="mortgage-top">
      <nav className="mortgage-nav" aria-label="Mortgage Lab navigation">
        <Link className="brand-link" href="/" aria-label="Jingheng Huan home"><BrandMark /></Link>
        <Link href="/"><ArrowLeft size={16} /> Back to the living room</Link>
      </nav>
      <header className="mortgage-heading">
        <p className="eyebrow">A SMALL EXPERIMENT</p>
        <h1>Mortgage <em>Lab.</em></h1>
        <p>When does the principal come back?</p>
      </header>
      <MortgageLab />
      <section className="mortgage-model" aria-labelledby="model-heading">
        <h2 id="model-heading">Inside the model.</h2>
        <p>A hypothetical pool of identical, newly originated fixed-rate mortgages. Payments arrive monthly.
          After scheduled principal is paid, prepayments reduce the remaining balance. As loans leave
          the pool, its scheduled monthly payment declines. Each surviving loan keeps its original payment and term.</p>
        <p>The note rate and CPR are independent assumptions. Changing the note rate does not trigger refinancing here.
          There are no defaults, fees, servicing costs, taxes, insurance, payment delays or discounting.
          These are mortgage-pool cash flows, not a live quote or a security’s net return.</p>
        <details>
          <summary>Definitions and calculation</summary>
          <p><strong>CPR</strong> is the annualized conditional prepayment rate, excluding scheduled principal.
            The monthly rate, <strong>SMM</strong>, is 1 − (1 − CPR)<sup>1/12</sup>, with rates expressed as decimals.
            It is applied after that month’s scheduled principal.</p>
          <p><strong>Weighted-average life (WAL)</strong> is the average time until principal is returned:
            sum of [(month ÷ 12) × (scheduled principal + prepaid principal)] ÷ original balance.
            It is different from the final maturity date.</p>
          <p>For a monthly note rate r and n remaining payments, scheduled P&amp;I = balance × r ÷ [1 − (1 + r)<sup>−n</sup>].
            At zero interest, it is balance ÷ n. Calculations retain full precision; displayed amounts are rounded.</p>
          <p className="mortgage-sources">Read more: <a href="https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/">CFPB on amortization</a>
            {' · '}<a href="https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr931.pdf#page=37">New York Fed on CPR and SMM (p. 35)</a></p>
        </details>
      </section>
    </main>
  );
}
