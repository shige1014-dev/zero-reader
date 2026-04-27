import test from "node:test";
import assert from "node:assert/strict";

import { getLearningCards } from "@/lib/learning-library";

test("local economics cards are readable from markdown content", () => {
  const cards = getLearningCards("economics");

  assert.ok(cards.length >= 3);
  assert.ok(cards.every((card) => card.category === "economics"));
  assert.ok(cards.every((card) => card.title.length > 0));
  assert.ok(cards.every((card) => card.summary.length >= 24));
  assert.ok(cards.every((card) => card.whyItMatters.length >= 20));
});

test("local figure cards are readable from markdown content", () => {
  const cards = getLearningCards("figure");

  assert.ok(cards.length >= 7);
  assert.ok(cards.every((card) => card.category === "figure"));
  assert.ok(cards.some((card) => card.title.includes("凯恩斯")));
  assert.ok(cards.some((card) => card.title.includes("哈耶克")));
  assert.ok(cards.some((card) => card.title.includes("熊彼特")));
  assert.ok(cards.some((card) => card.title.includes("弗里德曼")));
  assert.ok(cards.some((card) => card.title.includes("马歇尔")));
  assert.ok(cards.some((card) => card.title.includes("芒格")));
  assert.ok(cards.every((card) => card.works.length >= 1));
  assert.ok(cards.every((card) => card.works.every((work) => work.title.length > 0 && work.coreIdea.length >= 18)));
});
