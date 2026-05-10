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
      <div className="relative space-y-8">
        {/* 2 大门 入口 */}
        <section className="hub-gates">
          <Link href="/stock" className="hub-gate hub-stock">
            <div className="hub-gate-icon">📈</div>
            <h2 className="hub-gate-title">股 票 研 究 站</h2>
            <p className="hub-gate-sub">STOCK · DATA · DECISION</p>
            <p className="hub-gate-desc">从板块认知到三态推演 · 44 标的 / 11 板块 / 实时数据 / 仓位决策</p>
            <div className="hub-gate-tags">
              <span>学习网</span>
              <span>三维矩阵</span>
              <span>情报中心</span>
              <span>盯盘表</span>
            </div>
            <span className="hub-gate-cta">→ 进入</span>
          </Link>
          <Link href="/chronicle" className="hub-gate hub-chronicle">
            <div className="hub-gate-icon">🌌</div>
            <h2 className="hub-gate-title">叙 事 推 演 站</h2>
            <p className="hub-gate-sub">FUTURE · PROPHECY · NARRATIVE</p>
            <p className="hub-gate-desc">2030 推演 · 文明跃迁 · 黑科技档案 · 何如假设 · 备忘录</p>
            <div className="hub-gate-tags">
              <span>未来世界</span>
              <span>预言</span>
              <span>黑科技</span>
              <span>备忘录</span>
            </div>
            <span className="hub-gate-cta">→ 进入</span>
          </Link>
        </section>

        {/* 现有 LearningMode (下方备用) */}
        <details className="hub-secondary">
          <summary>▸ 学习模式 / 每日精读 / 课程</summary>
          <div className="silk-frame relative overflow-hidden rounded-[2rem] bg-surface/70 shadow-halo mt-4">
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
        </details>
      </div>
    </main>
  );
}
