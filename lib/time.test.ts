import test from "node:test";
import assert from "node:assert/strict";

import { todayDateString } from "./time.ts";

test("todayDateString uses Asia/Seoul calendar day instead of UTC day", () => {
  const instant = new Date("2026-04-18T23:30:00.000Z");
  assert.equal(todayDateString(instant), "2026-04-19");
});
