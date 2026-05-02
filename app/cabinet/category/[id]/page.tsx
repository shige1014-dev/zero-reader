import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CABINET_CATEGORIES,
  STATUS_LABEL,
  getCategoryById,
  getStoriesByCategory,
  type CabinetCategoryId,
  type CabinetStory
} from "@/lib/cabinet/data";

interface PageProps {
  params: { id: string };
}

const CATEGORY_IDS = CABINET_CATEGORIES.map((c) => c.id) as string[];

export function generateStaticParams() {
  return CABINET_CATEGORIES.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cat = getCategoryById(params.id as CabinetCategoryId);
  if (!cat) return { title: "怪谈奇闻 · CABINET" };
  return {
    title: `${cat.label} · 怪谈奇闻`,
    description: cat.intro
  };
}

export default function CabinetCategoryPage({ params }: PageProps) {
  if (!CATEGORY_IDS.includes(params.id)) notFound();
  const cat = getCategoryById(params.id as CabinetCategoryId);
  if (!cat) notFound();
  const stories = getStoriesByCategory(cat.id);

  return (
    <main className="cabinet-shell cabinet-cat-shell">
      <Link href="/cabinet" className="cabinet-back">← 返回奇物柜</Link>

      <header className="cabinet-cat-head">
        <p className="cabinet-kicker">{cat.en}</p>
        <h1>{cat.label}</h1>
        <p className="cabinet-cat-intro">{cat.intro}</p>
      </header>

      <nav className="cabinet-cat-tabs" aria-label="切换类别">
        {CABINET_CATEGORIES.map((c) => {
          const active = c.id === cat.id;
          return (
            <Link
              key={c.id}
              href={`/cabinet/category/${c.id}` as Parameters<typeof Link>[0]["href"]}
              className={"cabinet-cat-tab" + (active ? " is-active" : "")}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>

      <section className="cabinet-stories" aria-label={`${cat.label} 档案`}>
        {stories.map((story, idx) => (
          <StoryArticle key={story.id} story={story} index={idx} />
        ))}
      </section>
    </main>
  );
}

function StoryArticle({ story, index }: { story: CabinetStory; index: number }) {
  const status = STATUS_LABEL[story.status];
  return (
    <article className="cabinet-story" id={story.id}>
      <header className="cabinet-story-head">
        <div className="cabinet-story-folder">
          <span className="cabinet-story-num">档案号 #{String(index + 1).padStart(2, "0")}</span>
          <span className="cabinet-story-era">{story.era}</span>
        </div>
        <div className={"cabinet-status " + status.cls}>● {status.label}</div>
      </header>

      <h2 className="cabinet-story-title">{story.titleZh}</h2>
      <p className="cabinet-story-en">{story.titleEn}</p>
      <p className="cabinet-story-protag">主角 · {story.protagonist}</p>

      <p className="cabinet-story-hook">{story.hook}</p>

      <div className="cabinet-story-body">
        {story.story.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="cabinet-views">
        <div className="cabinet-view cabinet-view-main">
          <span className="cabinet-view-label">主流说法</span>
          <p>{story.mainstreamView}</p>
        </div>
        <div className="cabinet-view cabinet-view-here">
          <span className="cabinet-view-label">异端说法</span>
          <p>{story.hereticalView}</p>
        </div>
      </div>

      <div className="cabinet-meta-row">
        <div className="cabinet-rating">
          <span className="cabinet-meta-label">怪谈指数</span>
          <span className="cabinet-eyes">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={n <= story.weirdRating ? "is-on" : ""}>◉</span>
            ))}
          </span>
        </div>
        <div className="cabinet-credibility">
          <span className="cabinet-meta-label">可信度区间 · {story.credibilityLow}% – {story.credibilityHigh}%</span>
          <div className="cabinet-cred-track">
            <span
              className="cabinet-cred-fill"
              style={{
                left: `${story.credibilityLow}%`,
                width: `${story.credibilityHigh - story.credibilityLow}%`
              }}
            />
          </div>
        </div>
      </div>

      {story.links && (
        <div className="cabinet-links">
          {story.links.wiki && (
            <a href={story.links.wiki} target="_blank" rel="noopener noreferrer">维基</a>
          )}
          {story.links.doc && (
            <a href={story.links.doc} target="_blank" rel="noopener noreferrer">纪录片</a>
          )}
          {story.links.paper && (
            <a href={story.links.paper} target="_blank" rel="noopener noreferrer">论文</a>
          )}
        </div>
      )}
    </article>
  );
}
