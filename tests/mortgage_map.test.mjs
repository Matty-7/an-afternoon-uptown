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

import { mortgage_topics, mortgage_relationships, mortgage_paths } from '../content/mortgage_concepts.ts';
import { build_mortgage_graph, build_connection_graph, graph_bounds, fit_camera, zoom_camera, search_concepts } from '../lib/mortgage_graph.ts';

test('four-level hierarchy owns each concept once and never overlaps nodes at any depth', () => {
  const assigned = mortgage_topics.flatMap((t) => t.concepts);
  assert.equal(new Set(assigned).size, mortgage_concepts.length);
  assert.equal(assigned.length, mortgage_concepts.length);
  for (const concept of mortgage_concepts) {
    const topic = mortgage_topics.find((t) => t.id === concept.topic);
    assert.equal(topic?.branch, concept.branch);
    assert.ok(topic.concepts.includes(concept.id));
  }
  for (const filter of ['all', ...mortgage_branches.map((b) => b.id)]) {
    for (const depth of [0, 1, 2]) {
      const nodes = build_mortgage_graph(depth, filter);
      const ids = new Set(nodes.map((n) => n.id));
      assert.equal(ids.size, nodes.length);
      for (const node of nodes) {
        if (node.parent) assert.ok(ids.has(node.parent));
        const parents = new Set([node.id]);
        let parent = node.parent;
        while (parent) { assert.ok(!parents.has(parent)); parents.add(parent); parent = nodes.find((n) => n.id === parent)?.parent; }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        assert.ok(Math.abs(a.x - b.x) >= (a.width + b.width) / 2 || Math.abs(a.y - b.y) >= (a.height + b.height) / 2, `${filter}/${depth}: ${a.id} overlaps ${b.id}`);
      }
    }
  }
  assert.equal(build_mortgage_graph(2).filter((n) => n.kind === 'concept').length, mortgage_concepts.length);
});

test('analytical edges are explicit, typed and connected across every domain', () => {
  const index = new Map(mortgage_concepts.map((n) => [n.id, n]));
  assert.equal(new Set(mortgage_relationships.map((e) => e.id)).size, mortgage_relationships.length);
  for (const edge of mortgage_relationships) {
    assert.ok(index.has(edge.source) && index.has(edge.target));
    assert.notEqual(edge.source, edge.target);
    assert.ok(edge.label && edge.reason.length > 30);
    assert.ok(['mechanism', 'definition', 'measurement', 'comparison'].includes(edge.kind));
  }
  const cross = mortgage_relationships.filter((e) => index.get(e.source).branch !== index.get(e.target).branch);
  assert.ok(cross.length >= 24);
  for (const branch of mortgage_branches) assert.ok(cross.some((e) => index.get(e.source).branch === branch.id || index.get(e.target).branch === branch.id));
  for (const path of mortgage_paths) {
    assert.ok(path.steps.length >= 4);
    for (let i = 1; i < path.steps.length; i++) assert.ok(mortgage_relationships.some((e) =>
      (e.source === path.steps[i - 1] && e.target === path.steps[i]) || (e.target === path.steps[i - 1] && e.source === path.steps[i])), `${path.id}: missing explanation for ${path.steps[i - 1]} / ${path.steps[i]}`);
  }
});

test('connection studies expose every endpoint and keep cards apart', () => {
  for (const selected of mortgage_concepts) {
    const nodes = build_connection_graph(selected.id);
    const ids = new Set(nodes.map((n) => n.id));
    for (const edge of mortgage_relationships.filter((e) => e.source === selected.id || e.target === selected.id)) assert.ok(ids.has(edge.source) && ids.has(edge.target));
    assert.equal(ids.size, nodes.length);
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      assert.ok(Math.abs(nodes[i].x - nodes[j].x) >= 250 || Math.abs(nodes[i].y - nodes[j].y) >= 80);
    }
  }
});

test('search prioritizes exact terms and camera math preserves the zoom anchor', () => {
  assert.equal(search_concepts('  OAS ')[0].id, 'oas');
  assert.equal(search_concepts('weighted average loan age')[0].id, 'wala');
  assert.equal(search_concepts('no matching mortgage phrase').length, 0);
  assert.equal(search_concepts('').length, 0);
  const camera = { x: 150, y: 240, scale: 0.6 };
  const zoomed = zoom_camera(camera, 1.25, 430, 320);
  assert.ok(Math.abs((430 - camera.x) / camera.scale - (430 - zoomed.x) / zoomed.scale) < 1e-9);
  assert.ok(Math.abs((320 - camera.y) / camera.scale - (320 - zoomed.y) / zoomed.scale) < 1e-9);
  assert.equal(zoom_camera(camera, 100, 0, 0).scale, 2);
  assert.equal(zoom_camera(camera, 0.001, 0, 0).scale, 0.07);
  for (const [width, height] of [[1200, 650], [356, 440]]) {
    const bounds = graph_bounds(build_mortgage_graph(2));
    const fit = fit_camera(bounds, width, height);
    assert.ok(bounds.width * fit.scale <= width);
    assert.ok(bounds.height * fit.scale <= height);
  }
});
