import Link from 'next/link';
import type { Metadata } from 'next';
import { BrandMark } from '@/components/brand_mark';
import { MortgageMap } from '@/components/mortgage_map';
import { pageMetadata } from '@/lib/seo';
import 'katex/dist/katex.min.css';
import './mortgage_map.css';
import { render_mortgage_math } from '@/lib/mortgage_math';

export const metadata: Metadata = pageMetadata(
  'Mortgage Map — Jingheng Huan',
  'An interactive map of mortgage and MBS concepts, calculations and connections, with public reading sources.',
  '/portfolio/mortgage-map',
);

export default function MortgageMapPage() {
  return (
    <main className="map-page" id="map-top">
      <nav className="map-nav" aria-label="Portfolio navigation">
        <Link href="/" className="brand-link" aria-label="Jingheng Huan home">
          <BrandMark />
        </Link>
        <Link href="/#portfolio">← Portfolio</Link>
      </nav>
      <header className="map-header">
        <p className="eyebrow">PORTFOLIO / AN INTERACTIVE FIELD GUIDE</p>
        <h1>
          Mortgage <em>Map.</em>
        </h1>
        <p>
          Mortgages in the wider world of fixed income. Follow the cash flows,
          compare the spreads, and see how products, currencies and risks
          connect.
        </p>
      </header>
      <MortgageMap formulas={render_mortgage_math()} />
      <p className="map-scope">
        An evolving guide to mortgages, MBS and the ideas around them, including
        commercial property and structured credit. Original explanations link to
        public references. Relationships describe mechanisms under stated
        conditions; examples are illustrative.
      </p>
    </main>
  );
}
