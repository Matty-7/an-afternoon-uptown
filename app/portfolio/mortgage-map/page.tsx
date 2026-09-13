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
  'Explore mortgages and fixed income through connected concepts, financial comparisons, formulas and reading paths, with public sources.',
  '/portfolio/mortgage-map',
);

export default function MortgageMapPage() {
  return (
    <main className="map-page" id="map-top">
      <nav className="map-nav" aria-label="Projects navigation">
        <Link href="/" className="brand-link" aria-label="Jingheng Huan home">
          <BrandMark />
        </Link>
        <Link href="/#projects">← Projects</Link>
      </nav>
      <header className="map-header">
        <h1>
          Mortgage <em>Map.</em>
        </h1>
        <p>Mortgages, markets and the mechanics of fixed income.</p>
      </header>
      <MortgageMap formulas={render_mortgage_math()} />
      <p className="map-scope">
        An evolving guide to mortgages, MBS and the ideas around them, including
        commercial property and structured credit. Original explanations link to
        public references. Connections distinguish mechanisms, definitions,
        measurements and comparisons; examples are illustrative.
      </p>
    </main>
  );
}
