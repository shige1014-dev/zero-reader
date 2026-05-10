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

      {/* 顶部分类栏 — 左叙事(书) | 右股票(钱) */}
      <nav className="zhub-topnav">
        <Link href={"/novels" as any} className="zhub-nav-link zhub-nav-left">📖 小说</Link>
        <Link href={"/civilization-leap" as any} className="zhub-nav-link zhub-nav-left">📜 文明跃迁</Link>
        <Link href={"/what-if" as any} className="zhub-nav-link zhub-nav-left">🌠 如果</Link>
        <Link href={"/prophecies" as any} className="zhub-nav-link zhub-nav-left">🔮 预言</Link>
        <Link href={"/black-tech" as any} className="zhub-nav-link zhub-nav-left">⚙️ 黑科技</Link>
        <Link href={"/memorials" as any} className="zhub-nav-link zhub-nav-left">📔 备忘录</Link>
        <Link href={"/cabinet" as any} className="zhub-nav-link zhub-nav-left">🗄 档案柜</Link>
        <Link href={"/learning-os" as any} className="zhub-nav-link zhub-nav-left">📚 学习 OS</Link>
        <span className="zhub-nav-sep" />
        <Link href={"/stock-learning" as any} className="zhub-nav-link zhub-nav-right">💹 学习网</Link>
        <Link href={"/matrix" as any} className="zhub-nav-link zhub-nav-right">📐 矩阵</Link>
        <Link href={"/intel" as any} className="zhub-nav-link zhub-nav-right">🛰 情报</Link>
        <Link href={"/vault" as any} className="zhub-nav-link zhub-nav-right">🗝 藏库</Link>
      </nav>

      {/* 主体: 左 学习+叙事 / 右 股票, 中间金线, 两侧金球+绿球 */}
      <section className="zhub-main">
        <div className="zhub-orb zhub-orb-gold" aria-hidden="true" />
        <div className="zhub-orb zhub-orb-jade" aria-hidden="true" />
        <div className="zhub-divider" aria-hidden="true" />

        <Link href={"/chronicle" as any} className="zhub-half zhub-left">
          <div className="zhub-icon">📚</div>
          <p className="zhub-kicker">LEARN · NARRATIVE</p>
          <h2>学 习 与 叙 事</h2>
          <p className="zhub-desc">课程 / 未来世界 / 文明跃迁 / 黑科技 / 备忘录</p>
          <div className="zhub-tags">
            <span>📖 每日精读</span>
            <span>📜 2030 推演</span>
            <span>🔮 预言</span>
            <span>🌠 如果</span>
          </div>
          <span className="zhub-cta">→ 进入</span>
        </Link>

        <Link href={"/stock" as any} className="zhub-half zhub-right">
          <div className="zhub-icon">💰</div>
          <p className="zhub-kicker">STOCK · DATA</p>
          <h2>股 票 研 究 站</h2>
          <p className="zhub-desc">学习网 / 三维矩阵 / 情报 / 盯盘 / 持仓</p>
          <div className="zhub-tags">
            <span>📈 44 标的</span>
            <span>🪙 11 板块</span>
            <span>📊 实时数据</span>
            <span>⚖ 三态推演</span>
          </div>
          <span className="zhub-cta">→ 进入</span>
        </Link>
      </section>

      {/* 学习模式 (下方备用, 折叠) */}
      <details className="zhub-secondary">
        <summary>▸ 每日精读 / 课程库 (展开)</summary>
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
    </main>
  );
}
