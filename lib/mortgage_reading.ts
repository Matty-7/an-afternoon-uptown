export type ReadingTrail = { ids: string[]; cursor: number };

// A bounded, session-only trail. Opening a new branch discards forward history.
export function visit_concept(trail: ReadingTrail, id: string): ReadingTrail {
  if (trail.ids[trail.cursor] === id) return trail;
  const ids = [...trail.ids.slice(0, trail.cursor + 1), id].slice(-60);
  return { ids, cursor: ids.length - 1 };
}

export function read_concept_hash(hash: string, valid_ids: Set<string>) {
  const id = new URLSearchParams(hash.replace(/^#/, '')).get('concept');
  return id && valid_ids.has(id) ? id : null;
}

export function concept_hash(id: string) {
  return `#${new URLSearchParams({ concept: id }).toString()}`;
}
