import test from "node:test";
import assert from "node:assert/strict";

import {
  LEARNING_COURSES,
  LEARNING_FRONTIER_PAPERS,
  buildLearningImagePrompt,
  buildLearningTailSummary,
  getLearningCourse
} from "@/lib/learning-curriculum";

test("learning curriculum covers economics, investing, and long-term AI study", () => {
  assert.deepEqual(
    LEARNING_COURSES.map((course) => course.id),
    ["economics", "investing", "ai-long-course"]
  );

  for (const course of LEARNING_COURSES) {
    assert.ok(course.title.length > 0);
    assert.ok(course.scientificMethod.length >= 3);
    assert.ok(course.units.length >= 4);
    assert.ok(course.units.every((unit) => unit.concept.length > 0));
    assert.ok(course.units.every((unit) => unit.practice.length > 0));
    assert.ok(course.units.every((unit) => unit.definition.length >= 24));
    assert.ok(course.units.every((unit) => unit.mechanism.length >= 24));
    assert.ok(course.units.every((unit) => unit.example.length >= 16));
    assert.ok(course.units.every((unit) => unit.misconception.length >= 12));
    assert.ok(course.units.every((unit) => unit.reviewPrompt.length >= 12));
  }
});

test("getLearningCourse finds courses by stable id", () => {
  assert.equal(getLearningCourse("economics")?.title, "经济学");
  assert.equal(getLearningCourse("missing"), null);
});

test("buildLearningImagePrompt produces educational infographic prompts", () => {
  const prompt = buildLearningImagePrompt(LEARNING_COURSES[1]);

  assert.match(prompt, /educational infographic/i);
  assert.match(prompt, /投资学/);
  assert.match(prompt, /framework/i);
  assert.doesNotMatch(prompt, /buy|sell|price target|荐股|买入|卖出/i);
});

test("frontier papers are tagged to the three zerozero system lines", () => {
  assert.ok(LEARNING_FRONTIER_PAPERS.length >= 5);
  assert.ok(
    LEARNING_FRONTIER_PAPERS.every((paper) => paper.tags.length >= 1)
  );
  assert.ok(
    LEARNING_FRONTIER_PAPERS.every((paper) => /^https?:\/\//.test(paper.url))
  );
  assert.ok(
    LEARNING_FRONTIER_PAPERS.some((paper) => paper.tags.includes("赚钱系统"))
  );
  assert.ok(
    LEARNING_FRONTIER_PAPERS.some((paper) => paper.tags.includes("AI执行系统"))
  );
  assert.ok(
    LEARNING_FRONTIER_PAPERS.some((paper) => paper.tags.includes("认知跃迁系统"))
  );
});

test("tail summary returns zero summary, deep dives, and papers for visible courses", () => {
  const tailSummary = buildLearningTailSummary(LEARNING_COURSES);

  assert.match(tailSummary.zeroSummary, /零零总结/);
  assert.equal(tailSummary.deepDives.length, LEARNING_COURSES.length);
  assert.ok(tailSummary.deepDives.every((item) => item.title.length > 0));
  assert.ok(tailSummary.frontierPapers.length >= 5);
  assert.ok(
    tailSummary.frontierPapers.every((paper) =>
      LEARNING_COURSES.some((course) => course.id === paper.primaryCourseId)
    )
  );
});
