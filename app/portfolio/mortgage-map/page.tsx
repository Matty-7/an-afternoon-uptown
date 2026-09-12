import Link from 'next/link';
import type { Metadata } from 'next';
import { BrandMark } from '@/components/brand_mark';
import { MortgageMap } from '@/components/mortgage_map';
import { pageMetadata } from '@/lib/seo';
import './mortgage_map.css';

export const metadata: Metadata = pageMetadata(
  'Mortgage Map — Jingheng Huan',
  'An interactive map of mortgage and MBS concepts, calculations and connections, with public reading sources.',
  '/portfolio/mortgage-map',
);

export default function MortgageMapPage() {
  return (
    <main className="map-page" id="map-top">
      <nav className="map-nav" aria-label="Portfolio navigation">
        <Link href="/" className="brand-link" aria-label="Jingheng Huan home"><BrandMark /></Link>
        <Link href="/#portfolio">← Portfolio</Link>
      </nav>
      <header className="map-header">
        <p className="eyebrow">PORTFOLIO / A CONNECTED READING GUIDE</p>
        <h1>Mortgage <em>Map.</em></h1>
        <p>From one home loan to the securities built around it. Open a branch, then follow the connections.</p>
      </header>
      <MortgageMap />
      <p className="map-scope">A learning map of U.S. residential mortgages and MBS. Original summaries link to public references; examples are illustrative. No market quotes or investment recommendations.</p>
    </main>
  );
}
