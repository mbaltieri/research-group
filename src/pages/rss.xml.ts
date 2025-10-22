import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, { status: 404, statusText: 'Not found' });
  }

  const posts = await fetchPosts();

  // Coerce AstroWind's string enum to the boolean RSS expects:
  const rssTrailingSlash =
    typeof SITE.trailingSlash === 'boolean'
      ? SITE.trailingSlash
      : SITE.trailingSlash === 'always';

  const rss = await getRssString({
    title: `${SITE.name}’s Blog`,
    description: METADATA?.description || '',
    site: import.meta.env.SITE, // keep your current source for the base URL

    items: posts.map((post) => ({
      link: getPermalink(post.permalink, 'post'),
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate,
    })),

    trailingSlash: rssTrailingSlash, // ✅ boolean now
  });

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
};

