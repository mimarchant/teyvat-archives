import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const spoilerLevel = z.enum([
  "none",
  "mondstadt",
  "liyue",
  "inazuma",
  "sumeru",
  "fontaine",
  "natlan",
  "snezhnaya",
]);

const reviewStatus = z.enum(["draft", "needs-review", "verified"]);
const loreClassification = z.enum([
  "canon",
  "interpretation",
  "theory",
  "unresolved",
]);

const sourceSchema = z.object({
  id: z.string(),
  type: z.enum([
    "quest",
    "book",
    "dialogue",
    "item",
    "cinematic",
    "event",
    "official",
  ]),
  title: z.string(),
  gameVersion: z.string().optional(),
  reference: z.string().optional(),
  supports: z.string(),
});

const baseSchema = z.object({
  title: z.string(),
  summary: z.string(),
  cover: z.string().optional(),
  spoilerLevel,
  classification: loreClassification.default("canon"),
  updatedAt: z.coerce.date(),
  reviewStatus: reviewStatus.default("draft"),
  sources: z.array(sourceSchema).default([]),
  sections: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        spoilerLevel,
      }),
    )
    .default([]),
});

const chronicles = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/chronicles",
  }),
  schema: baseSchema.extend({
    era: z.string().optional(),
    timelineOrder: z.number().optional(),
  }),
});

const entities = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/entities",
  }),
  schema: baseSchema.extend({
    entityType: z.enum([
      "character",
      "civilization",
      "region",
      "faction",
      "deity",
      "concept",
      "location",
      "artifact",
    ]),
  }),
});

const quests = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/quests" }),
  schema: baseSchema.extend({
    questType: z.enum(["archon", "story", "world", "event"]),
  }),
});

const mysteries = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/mysteries",
  }),
  schema: baseSchema.extend({
    status: z.enum(["open", "partially-solved", "resolved"]),
  }),
});

export const collections = { chronicles, entities, quests, mysteries };
