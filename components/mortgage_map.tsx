'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mortgage_branches, mortgage_concepts, mortgage_sources, learning_path } from '@/content/mortgage_concepts';

export function MortgageMap() {
  const [expanded, set_expanded] = useState<string[]>(['basics']);
  const [selected, set_selected] = useState('principal_interest');
  const [query, set_query] = useState('');
  const [connections, set_connections] = useState<{ width: number; height: number; paths: string[] }>({ width: 1, height: 1, paths: [] });
  const surface_ref = useRef<HTMLDivElement>(null);
  const detail_ref = useRef<HTMLElement>(null);
  const selection_ref = useRef(false);
  const concept = mortgage_concepts.find((item) => item.id === selected)!;
  const branch = mortgage_branches.find((item) => item.id === concept.branch)!;
  const search_term = query.trim().toLowerCase();
  const matches = mortgage_concepts.filter((item) =>
    `${item.title} ${item.subtitle} ${item.aliases.join(' ')} ${item.summary}`.toLowerCase().includes(search_term),
  );
  const active_branches = search_term
    ? mortgage_branches.filter((item) => matches.some((match) => match.branch === item.id)).map((item) => item.id)
    : expanded;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const surface = surface_ref.current;
    if (!surface) return;
    const measure = () => {
      const root = surface.querySelector<HTMLElement>('.map-root');
      if (!root) return;
      const frame = surface.getBoundingClientRect();
      const center = root.getBoundingClientRect();
      const paths = Array.from(surface.querySelectorAll<HTMLElement>('[data-map-branch]')).map((item) => {
        const target = item.getBoundingClientRect();
        const on_left = target.left < center.left;
        const x1 = (on_left ? center.left : center.right) - frame.left;
        const y1 = center.top + center.height / 2 - frame.top;
        const x2 = (on_left ? target.right : target.left) - frame.left;
        const y2 = target.top + target.height / 2 - frame.top;
        const midpoint = (x1 + x2) / 2;
        return `M ${x1} ${y1} C ${midpoint} ${y1}, ${midpoint} ${y2}, ${x2} ${y2}`;
      });
      const next = { width: frame.width, height: frame.height, paths };
      set_connections((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(surface);
    surface.querySelectorAll('[data-map-branch]').forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [expanded, search_term]);

  useEffect(() => {
    if (!selection_ref.current) return;
    if (detail_ref.current) detail_ref.current.scrollTop = 0;
    detail_ref.current?.focus({ preventScroll: true });
    if (window.matchMedia('(max-width: 1099px)').matches) {
      detail_ref.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }, [selected]);

  const select_concept = (id: string) => {
    const item = mortgage_concepts.find((entry) => entry.id === id);
    if (!item) return;
    selection_ref.current = true;
    set_query('');
    set_expanded((previous) => previous.includes(item.branch) ? previous : [...previous, item.branch]);
    if (selected === id) {
      detail_ref.current?.focus();
    } else {
      set_selected(id);
    }
  };
  const concept_title = (id: string) => mortgage_concepts.find((item) => item.id === id)!.title;
  const return_to_map = () => {
    set_query('');
    set_expanded((previous) => previous.includes(concept.branch) ? previous : [...previous, concept.branch]);
    requestAnimationFrame(() => {
      const node = surface_ref.current?.querySelector<HTMLElement>(`[data-concept-id="${selected}"]`);
      node?.focus({ preventScroll: true });
      node?.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
  };

  return (
    <div className="mortgage-map">
      <div className="map-tools">
        <div className="map-search">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="concept-search">Find a mortgage concept</label>
          <Input id="concept-search" type="search" placeholder="Find a concept, e.g. CPR or convexity" value={query} onChange={(event) => set_query(event.target.value)} />
          {query && <Button variant="ghost" className="map-clear" aria-label="Clear search" onClick={() => set_query('')}><X size={18} /></Button>}
        </div>
        <div className="map-expand-tools">
          <Button variant="ghost" onClick={() => { set_query(''); set_expanded(mortgage_branches.map((item) => item.id)); }}>Expand all</Button>
          <Button variant="ghost" onClick={() => { set_query(''); set_expanded([]); }}>Collapse all</Button>
        </div>
      </div>
      <output className="map-result-count">{search_term ? `${matches.length} matching concepts` : `${mortgage_concepts.length} concepts · ${mortgage_branches.length} connected branches`}</output>
      <div className="map-workspace">
        <section className="map-tree-panel" aria-label="Mortgage concept map">
          <div className="map-surface" ref={surface_ref}>
            <svg className="map-connections" viewBox={`0 0 ${connections.width} ${connections.height}`} preserveAspectRatio="none" aria-hidden="true">
              {connections.paths.map((path, index) => <path key={index} d={path} />)}
            </svg>
            <div className="map-root"><span>MORTGAGE</span><strong>&amp; MBS</strong><span>Start with a branch</span></div>
            <Accordion multiple value={active_branches} onValueChange={(value) => { set_query(''); set_expanded(value as string[]); }} className="map-branches">
              {mortgage_branches.map((item, index) => {
                const nodes = matches.filter((node) => node.branch === item.id);
                return (
                  <AccordionItem key={item.id} value={item.id} className={`map-branch map-branch-${index + 1}`}>
                    <AccordionTrigger className="map-branch-trigger" data-map-branch={item.id}>
                      <span><span className="map-branch-number">0{index + 1}</span><strong>{item.title}</strong><small>{item.question}</small></span>
                    </AccordionTrigger>
                    <AccordionContent className="map-branch-content">
                      <ul className="map-node-list">
                        {nodes.map((node) => <li key={node.id}><button type="button" data-concept-id={node.id} aria-pressed={node.id === selected} aria-controls="concept-detail" onClick={() => select_concept(node.id)}><span>{node.title}</span><small>{node.subtitle}</small></button></li>)}
                      </ul>
                      {!nodes.length && <p className="map-no-match">No matches in this branch.</p>}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
          {search_term && !matches.length && <p className="map-empty">No concept found. Try “prepayment”, “WAL” or “TBA”, or clear the search.</p>}
          <div className="map-learning-path">
            <p className="map-label">FOLLOW ONE IDEA</p>
            <p>How does a borrower’s decision become an investor’s risk?</p>
            <ol>{learning_path.map((step, index) => <li key={step.id}><button type="button" onClick={() => select_concept(step.id)}>{concept_title(step.id)}</button>{index < learning_path.length - 1 && <span><ArrowDown size={14} aria-hidden="true" /> {step.connection}</span>}</li>)}</ol>
          </div>
        </section>
        <article className="map-detail" id="concept-detail" aria-labelledby="concept-title" tabIndex={-1} ref={detail_ref}>
          <p className="map-label">{branch.title}</p>
          <h2 id="concept-title">{concept.title}</h2>
          <p className="map-detail-subtitle">{concept.subtitle}</p>
          <p className="map-summary">{concept.summary}</p>
          {concept.formula && <div className="map-formula"><h3>The calculation</h3><code>{concept.formula.expression}</code><p>{concept.formula.assumptions}</p>{concept.formula.example && <p><strong>Illustrative example.</strong> {concept.formula.example}</p>}</div>}
          <div className="map-caution"><h3>Keep the distinction</h3><p>{concept.distinction}</p></div>
          <div className="map-related"><h3>Connect it</h3><ul>{concept.links.map((link) => <li key={link.id}><button type="button" onClick={() => select_concept(link.id)}>{concept_title(link.id)} <ArrowUpRight size={15} aria-hidden="true" /></button><p>{link.reason}</p></li>)}</ul></div>
          <details className="map-check" key={concept.id}><summary>Check your understanding</summary><p>{concept.question}</p><details><summary>Show the reasoning</summary><p>{concept.answer}</p></details></details>
          <div className="map-references"><h3>Read the source</h3><ul>{concept.sources.map((id) => <li key={id}><a href={mortgage_sources[id].url} target="_blank" rel="noreferrer">{mortgage_sources[id].publisher} <ArrowUpRight size={14} aria-hidden="true" /><span>{mortgage_sources[id].title}</span></a></li>)}</ul></div>
          <button type="button" onClick={return_to_map} className="map-return">Back to the map ↑</button>
        </article>
      </div>
    </div>
  );
}
