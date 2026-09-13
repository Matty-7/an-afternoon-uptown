import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  assert_newsletter_links,
  validate_newsletter_links,
} from '../lib/newsletter_schema.ts';
import { get_published_posts } from '../lib/post_visibility.ts';

const provider = 'https://example.substack.com';
const valid = {
  slug: 'a-real-note',
  title: 'A real note',
  date: '2024-02-29',
  kind: 'Note',
  status: 'published',
  external_url: `${provider}/p/a-real-note`,
};

test('publication schema rejects malformed dates and metadata at build and runtime boundaries', () => {
  const invalid = [
    ...[
      '2026-02-30',
      '2025-02-29',
      '2026-13-01',
      '2026-2-01',
      '2026-01-01T00:00:00Z',
      'not-a-date',
    ].map((date) => ({ ...valid, date })),
    { ...valid, slug: 'Bad Slug' },
    { ...valid, title: ' ' },
    { ...valid, title: ' padded ' },
    { ...valid, kind: 'Article' },
    { ...valid, kind: ['Note'] },
    { ...valid, status: 'ready' },
    ...[
      'http://example.substack.com/p/a',
      'https://other.substack.com/p/a',
      'not-a-url',
      'https://user:pass@example.substack.com/p/a',
    ].map((external_url) => ({ ...valid, external_url })),
    { ...valid, blocks: [] },
    { ...valid, excerpt: 'Private prose' },
    { ...valid, body: 'Private prose' },
    null,
    [],
  ];
  for (const record of invalid) {
    assert.throws(
      () => assert_newsletter_links([record], provider),
      /newsletter_links\[0\]/,
    );
    assert.deepEqual(validate_newsletter_links([record], provider).links, []);
    assert.equal(
      get_published_posts(
        validate_newsletter_links([record], provider).links,
        Date.parse('2027-01-01'),
      ).length,
      0,
    );
  }
  assert.deepEqual(assert_newsletter_links([valid], provider), [valid]);
  assert.deepEqual(
    get_published_posts(
      [{ ...valid, date: '2026-02-30' }],
      Date.parse('2027-01-01'),
    ),
    [],
  );
});

test('all duplicate slug records are excluded while unrelated valid records survive', () => {
  const other = { ...valid, slug: 'another-note' };
  const input = [valid, { ...valid, title: 'Conflicting title' }, other];
  assert.throws(
    () => assert_newsletter_links(input, provider),
    /duplicate slug/,
  );
  assert.deepEqual(validate_newsletter_links(input, provider).links, [other]);
  assert.equal(validate_newsletter_links(input, provider).errors.length, 2);
  assert.deepEqual(validate_newsletter_links([valid], null).links, []);
  assert.throws(
    () => assert_newsletter_links({}, provider),
    /must be an array/,
  );
});

test('valid links still obey draft status and the request-time publication boundary', () => {
  const scheduled = { ...valid, slug: 'tomorrow', date: '2026-09-14' };
  const draft = { ...valid, slug: 'private', status: 'draft' };
  const links = assert_newsletter_links([valid, scheduled, draft], provider);
  assert.deepEqual(
    get_published_posts(links, Date.parse('2026-09-13T23:59:59Z')).map(
      (x) => x.slug,
    ),
    [valid.slug],
  );
  assert.deepEqual(
    get_published_posts(links, Date.parse('2026-09-14T00:00:00Z')).map(
      (x) => x.slug,
    ),
    [scheduled.slug, valid.slug],
  );
});
