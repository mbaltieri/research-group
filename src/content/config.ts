import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { ORDERED_GROUPS } from '~/roles.ts';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const people = defineCollection({
  type: 'content', // Markdown-based entries
  schema: z.object({
    name: z.string(),
    role: z.string(),
    // group: z.enum(['Executive Team', 'Team Leaders', 'Researchers', 'Advisors']).default('Researchers'),
    group: z.enum(ORDERED_GROUPS).default('Researchers'),
    bio: z.string().optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    image: z.string().optional(), // e.g. "/images/people/jane.jpg"
    order: z.number().default(999), // for manual sorting
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    number: z.number().optional(),          // from Excel "No."
    title: z.string(),
    authors: z.union([
      z.string(),                           // allow plain string (fallback)
      z.array(z.string()),                  // preferred ["Doe, J.", "Smith, A."]
    ]),
    year: z.number(),

    venue: z.string().optional(),           // "Nature", "NeurIPS", etc.
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),

    type: z.enum([
      'Journal',
      'Conference Proceeding',
      'Workshop',
      'Preprint',
      'Book',
      'Thesis',
      'Other',
      'Paper',                              // to support your Excel "Paper"
      'Poster Presentation',                // extra Excel values
      'Book Chapter'
    ]).default('Preprint'),

    abstract: z.string().optional(),

    doi: z.string().optional(),             // full URL or bare DOI
    url: z.string().optional(),             // for "Publication link"
    arxiv: z.string().optional(),
    pdf: z.string().optional(),
    code: z.string().url().optional(),
    slides: z.string().url().optional(),
    poster: z.string().url().optional(),

    award: z.string().optional(),
    tags: z.union([
      z.string(),
      z.array(z.string()),
    ]).optional(),
    language: z.string().optional(),
    scholar: z.boolean().optional(),

    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

const funders = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(), // Display name
    pi: z.union([z.string(), z.array(z.string())]).optional(),
    website: z.string().url(), // External URL
    logo: z.string().optional(), // /images/funders/*.svg|png
    grant: z.string().optional(),
    area: z.string().optional(),
    startYear: z.number().int().min(1900).max(2100).optional(), // Beginning year
    endYear: z.number().int().min(1900).max(2100).optional(),   // Ending year
    weight: z.number().default(0), // Sort key (lower = first)
    active: z.boolean().optional().default(true),
  }),
});

const activities = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.enum(["reading-group", "seminar", "workshop", "other"]),
    period: z.string().optional(),       // e.g. "2024–2025" or "Ongoing"
    location: z.string().optional(),
    link: z.string().url().optional(),   // external info or signup
    image: z.string().optional(),        // /images/activities/*.jpg|png|svg
    weight: z.number().default(0),       // sort key
    draft: z.boolean().default(false),
  }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

export const collections = {
  people, 
  publications,
  funders,
  activities,
  post: postCollection,
};
