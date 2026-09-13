import { ArrowUpRight, Network } from 'lucide-react';
import { mortgage_sources } from '@/content/mortgage_concepts';
import type { MortgageRelationship } from '@/content/mortgage_concepts';
import { concept_index } from '@/lib/mortgage_graph';

export function MortgageRelations({
  relations,
  choose_concept,
  explore,
}: {
  relations: MortgageRelationship[];
  choose_concept: (id: string, trigger?: HTMLButtonElement) => void;
  explore: () => void;
}) {
  if (!relations.length) return null;
  return (
    <section
      id="concept-connections"
      className="atlas-reader-relations"
      aria-label="How it connects"
      tabIndex={-1}
    >
      <div className="atlas-section-heading">
        <h3>How it connects</h3>
        <button className="atlas-text-button" onClick={explore}>
          Explore connections <Network size={14} />
        </button>
      </div>
      {relations.map((edge) => (
        <article className="atlas-related" key={edge.id}>
          <div className="atlas-relation-endpoints">
            <button
              onClick={(e) => choose_concept(edge.source, e.currentTarget)}
            >
              {concept_index.get(edge.source)?.title}
            </button>
            <span
              aria-label={edge.kind === 'comparison' ? 'compared with' : 'to'}
            >
              {edge.kind === 'comparison' ? '↔' : '→'}
            </span>
            <button
              onClick={(e) => choose_concept(edge.target, e.currentTarget)}
            >
              {concept_index.get(edge.target)?.title}
              <ArrowUpRight size={13} />
            </button>
          </div>
          <em>{edge.kind}</em>
          <p>{edge.reason}</p>
          {edge.conditions && (
            <p className="atlas-relation-conditions">
              <strong>When this holds: </strong>
              {edge.conditions}
            </p>
          )}
          {edge.sources && (
            <div className="atlas-relation-sources">
              {edge.sources.map((id) => (
                <a
                  key={id}
                  href={mortgage_sources[id].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {mortgage_sources[id].publisher}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
