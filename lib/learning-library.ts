import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type LearningCardCategory = "economics" | "figure";

export interface LearningWork {
  title: string;
  coreIdea: string;
}

export interface LearningCard {
  slug: string;
  title: string;
  summary: string;
  category: LearningCardCategory;
  discipline: string;
  tags: string[];
  whyItMatters: string;
  studyPrompt: string;
  works: LearningWork[];
}

type LearningCardFrontmatter = {
  title?: string;
  summary?: string;
  discipline?: string;
  tags?: string[];
  whyItMatters?: string;
  studyPrompt?: string;
  works?: Array<{
    title?: string;
    coreIdea?: string;
  }>;
};

const baseDirectory = path.join(process.cwd(), "content", "learning-cards");

function categoryDirectory(category: LearningCardCategory) {
  return path.join(baseDirectory, category === "economics" ? "economics" : "figures");
}

function getMarkdownFiles(category: LearningCardCategory) {
  const dir = categoryDirectory(category);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function readLearningCard(category: LearningCardCategory, fileName: string): LearningCard {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(categoryDirectory(category), fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const frontmatter = data as LearningCardFrontmatter;
  const works = Array.isArray(frontmatter.works)
    ? frontmatter.works
        .filter((work) => typeof work?.title === "string" && typeof work?.coreIdea === "string")
        .map((work) => ({
          title: work.title!.trim(),
          coreIdea: work.coreIdea!.trim()
        }))
        .filter((work) => work.title.length > 0 && work.coreIdea.length > 0)
    : [];

  return {
    slug,
    title: frontmatter.title ?? slug,
    summary: frontmatter.summary ?? "暂无摘要",
    category,
    discipline: frontmatter.discipline ?? (category === "economics" ? "经济学知识卡" : "经济学人物"),
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    whyItMatters: frontmatter.whyItMatters ?? "帮助把抽象理论转成稳定判断框架。",
    studyPrompt: frontmatter.studyPrompt ?? "先理解核心定义，再想它如何改变现实判断。",
    works
  };
}

export function getLearningCards(category: LearningCardCategory): LearningCard[] {
  return getMarkdownFiles(category).map((fileName) => readLearningCard(category, fileName));
}
