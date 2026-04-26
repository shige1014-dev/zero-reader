import test from "node:test";
import assert from "node:assert/strict";

import { buildImageGenerationPayload, imageModelLabel } from "@/lib/learning-image";

test("buildImageGenerationPayload uses the current OpenAI image model by default", () => {
  const payload = buildImageGenerationPayload("Draw a learning map");

  assert.equal(payload.model, "gpt-image-1.5");
  assert.equal(payload.prompt, "Draw a learning map");
  assert.equal(payload.size, "1024x1024");
});

test("buildImageGenerationPayload allows an explicit model override", () => {
  const payload = buildImageGenerationPayload("Draw a small card", "gpt-image-1-mini");

  assert.equal(payload.model, "gpt-image-1-mini");
});

test("imageModelLabel does not expose the deprecated gpt 2.0 name", () => {
  assert.equal(imageModelLabel("gpt-image-1.5"), "GPT Image 1.5");
  assert.notEqual(imageModelLabel("gpt-image-1.5"), "GPT 2.0");
});
