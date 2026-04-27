import type { Metadata } from "next";

import { IntelTerminal } from "@/components/intel-terminal";
import { getFeed, getLatestBriefing } from "@/lib/db";
import { buildIntelViewModel } from "@/lib/intel-presenter";
import { readSitianSnapshot } from "@/lib/sitian-report";

export const metadata: Metadata = {
  title: "Signal Desk",
  description: "面向投资决策的高信噪比情报终端。"
};

export const revalidate = 3600;

export default function IntelPage() {
  const briefing = getLatestBriefing();
  const sitian = readSitianSnapshot();
  const feedItems = getFeed({ limit: 40 });
  const view = buildIntelViewModel(briefing, feedItems, sitian, { maxAgeHours: 24 });

  return <IntelTerminal view={view} />;
}
