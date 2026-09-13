import rawPosts from '@/content/newsletter_links.json';
import profile from '@/content/profile.json';
import { get_published_posts } from '@/lib/post_visibility';
import {
  validate_newsletter_links,
  type NewsletterLink,
} from '@/lib/newsletter_schema';

export type Post = NewsletterLink;
const { links: posts } = validate_newsletter_links(
  rawPosts,
  profile.newsletterUrl,
);
// Resolve visibility during each request, never against the Worker startup clock.
export const get_visible_posts = () => get_published_posts(posts);
export const newsletterUrl: string | null = profile.newsletterUrl;
export const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
