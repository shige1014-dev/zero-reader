import { LearningMode } from "@/components/learning-mode";
import { getLatestBriefing } from "@/lib/db";
import { LEARNING_COURSES } from "@/lib/learning-curriculum";
import { getLearningCards } from "@/lib/learning-library";

export const revalidate = 3600;

export default function HomePage() {
  const briefing = getLatestBriefing();
  const economicsCards = getLearningCards("economics");
  const figureCards = getLearningCards("figure");

  return (
    <main className="relative pb-12 pt-6 sm:pb-16 sm:pt-8">
      <div className="gold-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="gold-halo" />
      <div className="relative space-y-6">
        <div className="silk-frame relative overflow-hidden rounded-[2rem] bg-surface/70 shadow-halo">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,185,119,0.12),transparent_30%)]" />
          <div className="relative p-3 sm:p-4">
            <LearningMode
              briefing={briefing}
              courses={LEARNING_COURSES}
              economicsCards={economicsCards}
              figureCards={figureCards}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
