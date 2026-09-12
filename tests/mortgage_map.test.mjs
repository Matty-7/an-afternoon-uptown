import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mortgage_branches, mortgage_concepts, mortgage_sources, learning_path } from '../content/mortgage_concepts.ts';

test('every learning node has a unique identity, a visible branch and complete reading links', () => {
  const ids = new Set(mortgage_concepts.map((node) => node.id));
  const branches = new Set(mortgage_branches.map((branch) => branch.id));
  assert.equal(ids.size, mortgage_concepts.length);
  assert.equal(branches.size, mortgage_branches.length);
  assert.ok(mortgage_concepts.length >= 30);
  for (const branch of branches) assert.ok(mortgage_concepts.some((node) => node.branch === branch));
  for (const node of mortgage_concepts) {
    assert.match(node.id, /^[a-z][a-z0-9_]*$/);
    assert.ok(branches.has(node.branch), node.id);
    assert.ok(node.summary && node.distinction && node.question && node.answer, node.id);
    assert.ok(node.links.length && node.sources.length, node.id);
    assert.equal(new Set(node.links.map((link) => link.id)).size, node.links.length);
    for (const link of node.links) {
      assert.ok(ids.has(link.id) && link.id !== node.id, `${node.id} → ${link.id}`);
      assert.ok(link.reason.length > 10, `${node.id} needs a relationship, not a bare tag`);
    }
    for (const id of node.sources) {
      const source = mortgage_sources[id];
      assert.ok(source?.publisher && source.title, `${node.id}: ${id}`);
      assert.equal(new URL(source.url).protocol, 'https:');
    }
    if (node.formula) assert.ok(node.formula.expression && node.formula.assumptions);
  }
  for (const step of learning_path) assert.ok(ids.has(step.id));
});

test('the knowledge graph has no disconnected cluster, including cross-branch learning connections', () => {
  const seen = new Set();
  const pending = [mortgage_concepts[0].id];
  while (pending.length) {
    const id = pending.pop();
    if (seen.has(id)) continue;
    seen.add(id);
    const node = mortgage_concepts.find((item) => item.id === id);
    pending.push(...node.links.map((link) => link.id));
    pending.push(...mortgage_concepts.filter((item) => item.links.some((link) => link.id === id)).map((item) => item.id));
  }
  assert.equal(seen.size, mortgage_concepts.length);
  for (const branch of mortgage_branches) {
    assert.ok(mortgage_concepts.some((node) => node.branch === branch.id && node.links.some((link) =>
      mortgage_concepts.find((target) => target.id === link.id).branch !== branch.id,
    )), `${branch.id} must connect to the wider subject`);
  }
});
