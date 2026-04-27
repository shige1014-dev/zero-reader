import { NEWSNOW_DISPLAY_NAMES } from "@/lib/sources/newsnow";
import type { SourceItem } from "@/lib/sources/types";

const INTERNAL_SOURCES = new Set(["Macro Desk", "Macro Grid", "Research Note", "Risk Monitor", "Semi Daily"]);
const EXTERNAL_ALLOWED_SOURCES = new Set(["Bloomberg", "CNBC", "Reuters", "Financial Times", "Stratechery.com", "ArXiv"]);

export function isAllowedIngestItem(item: SourceItem): boolean {
  // newsnow and x-twitter are curated source lists, so they bypass the English-media whitelist.
  if (item.sourceType === "newsnow") return NEWSNOW_DISPLAY_NAMES.has(item.source);
  if (item.sourceType === "x-twitter") return true;
  return INTERNAL_SOURCES.has(item.source) || EXTERNAL_ALLOWED_SOURCES.has(item.source);
}
