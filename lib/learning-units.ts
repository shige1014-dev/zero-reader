import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { LearningCourseId, LearningUnit } from "@/lib/learning-curriculum";

const baseDirectory = path.join(process.cwd(), "content", "learning-units");

type UnitFrontmatter = Partial<LearningUnit>;

function readUnit(courseId: LearningCourseId, fileName: string): LearningUnit | null {
  const fullPath = path.join(baseDirectory, courseId, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const fm = data as UnitFrontmatter;

  if (!fm.concept) {
    return null;
  }

  return {
    concept: fm.concept,
    question: fm.question ?? "",
    definition: fm.definition ?? "",
    mechanism: fm.mechanism ?? "",
    example: fm.example ?? "",
    misconception: fm.misconception ?? "",
    practice: fm.practice ?? "",
    reviewPrompt: fm.reviewPrompt ?? ""
  };
}

export function getLearningUnits(courseId: LearningCourseId): LearningUnit[] {
  const dir = path.join(baseDirectory, courseId);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => readUnit(courseId, f))
    .filter((u): u is LearningUnit => u !== null);
}

export function pickTodayUnit(units: LearningUnit[], date = new Date()): LearningUnit | null {
  if (units.length === 0) return null;
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  return units[dayIndex % units.length];
}
