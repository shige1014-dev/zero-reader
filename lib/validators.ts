import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const createArticleSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  source: z.string().min(1),
  date: z.string().regex(datePattern),
  tags: z.array(z.string().min(1)).min(1),
  zeroEval: z.string().min(100).max(1500),
  summary: z.string().min(1).max(500),
  recommendLevel: z.number().int().min(1).max(5),
  obiRef: z.string().min(1),
  pushedAt: z.string().datetime().nullable().optional(),
  pushedMorningAt: z.string().datetime().nullable().optional(),
  pushedEveningAt: z.string().datetime().nullable().optional()
});

export const pushArticleSchema = z.object({
  slot: z.enum(["morning", "evening"])
});
