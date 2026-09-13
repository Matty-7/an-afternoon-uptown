export type NewsletterLink = {
  slug: string;
  title: string;
  date: string;
  kind: 'Essay' | 'Note' | 'Letter';
  status: 'draft' | 'published';
  external_url: string;
};

export function is_calendar_date(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return (
    Number.isFinite(timestamp) &&
    new Date(timestamp).toISOString().slice(0, 10) === value
  );
}

const fields = ['slug', 'title', 'date', 'kind', 'status', 'external_url'];

// The build and request-time publication path share this boundary. Invalid
// records and every member of a duplicate-slug group are excluded at runtime.
export function validate_newsletter_links(
  input: unknown,
  provider: unknown,
): {
  links: NewsletterLink[];
  errors: string[];
} {
  if (!Array.isArray(input))
    return { links: [], errors: ['newsletter_links must be an array'] };
  let origin: string | undefined;
  try {
    const url = new URL(typeof provider === 'string' ? provider : '');
    if (url.protocol === 'https:' && !url.username && !url.password)
      origin = url.origin;
  } catch {
    /* An unconfigured provider cannot publish links. */
  }
  if (!origin)
    return {
      links: [],
      errors: input.length
        ? ['newsletterUrl must be a configured HTTPS provider']
        : [],
    };

  const counts = new Map<unknown, number>();
  for (const item of input) {
    if (item && typeof item === 'object' && typeof item.slug === 'string')
      counts.set(item.slug, (counts.get(item.slug) ?? 0) + 1);
  }
  const links: NewsletterLink[] = [];
  const errors: string[] = [];
  input.forEach((item: unknown, index) => {
    const problems: string[] = [];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      errors.push(`newsletter_links[${index}]: expected a link record`);
      return;
    }
    const record = item as Record<string, unknown>;
    if (Object.keys(record).some((key) => !fields.includes(key)))
      problems.push(
        'only link metadata is allowed; remove prose or unknown fields',
      );
    if (
      typeof record.slug !== 'string' ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)
    )
      problems.push('slug must be lowercase kebab-case');
    if ((counts.get(record.slug) ?? 0) > 1) problems.push('duplicate slug');
    if (
      typeof record.title !== 'string' ||
      !record.title.trim() ||
      record.title !== record.title.trim()
    )
      problems.push('title must be nonempty and trimmed');
    if (!is_calendar_date(record.date))
      problems.push('date must be a real YYYY-MM-DD calendar date');
    if (
      typeof record.kind !== 'string' ||
      !['Essay', 'Note', 'Letter'].includes(record.kind)
    )
      problems.push('kind must be Essay, Note or Letter');
    if (
      typeof record.status !== 'string' ||
      !['draft', 'published'].includes(record.status)
    )
      problems.push('status must be draft or published');
    try {
      if (
        typeof record.external_url !== 'string' ||
        record.external_url !== record.external_url.trim()
      )
        throw new Error();
      const url = new URL(record.external_url);
      if (
        url.protocol !== 'https:' ||
        url.origin !== origin ||
        url.username ||
        url.password
      )
        throw new Error();
    } catch {
      problems.push(
        'external_url must be an HTTPS URL on the configured provider origin',
      );
    }
    if (problems.length)
      errors.push(
        `newsletter_links[${index}] (${String(record.slug)}): ${problems.join('; ')}`,
      );
    else links.push(record as NewsletterLink);
  });
  return { links, errors };
}

export function assert_newsletter_links(
  input: unknown,
  provider: unknown,
): NewsletterLink[] {
  const result = validate_newsletter_links(input, provider);
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  return result.links;
}
