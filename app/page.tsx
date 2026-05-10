import Link from "next/link";
import { LearningMode } from "@/components/learning-mode";
import { getLatestBriefing } from "@/lib/db";
import { LEARNING_COURSE_META, type LearningCourse } from "@/lib/learning-curriculum";
import { getLearningCards } from "@/lib/learning-library";
import { getLearningUnits, pickTodayUnit } from "@/lib/learning-units";

export const revalidate = 3600;

export default function HomePage() {
  const briefing = getLatestBriefing();
  const economicsCards = getLearningCards("economics");
  const figureCards = getLearningCards("figure");

  const courses: LearningCourse[] = LEARNING_COURSE_META.map((meta) => ({
    ...meta,
    units: getLearningUnits(meta.id)
  }));

  const todayUnits = courses
    .map((course) => {
      const unit = pickTodayUnit(course.units);
      return unit
        ? { courseId: course.id, courseTitle: course.title, unit, total: course.units.length }
        : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <main className="relative pb-12 pt-6 sm:pb-16 sm:pt-8">
      <div className="gold-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="gold-halo" />

      {/* 顶部分类栏 — 左叙事 | 金线 | 右股票, 两端浮球 */}
      <nav className="zhub-topnav">
        <span className="zhub-orb zhub-orb-gold" aria-hidden="true" />
        <div className="zhub-nav-side zhub-nav-side-left">
          <Link href={"/novels" as any} className="zhub-nav-link zhub-nav-left">📖 小说</Link>
          <Link href={"/civilization-leap" as any} className="zhub-nav-link zhub-nav-left">📜 文明跃迁</Link>
          <Link href={"/what-if" as any} className="zhub-nav-link zhub-nav-left">🌠 如果</Link>
          <Link href={"/prophecies" as any} className="zhub-nav-link zhub-nav-left">🔮 预言</Link>
          <Link href={"/black-tech" as any} className="zhub-nav-link zhub-nav-left">⚙️ 黑科技</Link>
          <Link href={"/memorials" as any} className="zhub-nav-link zhub-nav-left">📔 备忘录</Link>
          <Link href={"/cabinet" as any} className="zhub-nav-link zhub-nav-left">🗄 档案柜</Link>
          <Link href={"/learning-os" as any} className="zhub-nav-link zhub-nav-left">📚 学习 OS</Link>
        </div>
        <span className="zhub-nav-sep" />
        <div className="zhub-nav-side zhub-nav-side-right">
          <Link href={"/stock-learning" as any} className="zhub-nav-link zhub-nav-right">💹 学习网</Link>
          <Link href={"/matrix" as any} className="zhub-nav-link zhub-nav-right">📐 矩阵</Link>
          <Link href={"/intel" as any} className="zhub-nav-link zhub-nav-right">🛰 情报</Link>
          <Link href={"/vault" as any} className="zhub-nav-link zhub-nav-right">🗝 藏库</Link>
        </div>
        <span className="zhub-orb zhub-orb-jade" aria-hidden="true" />
      </nav>

      {/* 主体: 现有 LearningMode */}
      <div className="silk-frame relative overflow-hidden rounded-[2rem] bg-surface/70 shadow-halo">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,185,119,0.12),transparent_30%)]" />
        <div className="relative p-3 sm:p-4">
          <LearningMode
            briefing={briefing}
            courses={courses}
            economicsCards={economicsCards}
            figureCards={figureCards}
            todayUnits={todayUnits}
          />
        </div>
      </div>
    </main>
  );
}
