import { NextResponse } from "next/server";

import { buildLearningImagePrompt, getLearningCourse } from "@/lib/learning-curriculum";
import { generateLearningImage, imageModelLabel } from "@/lib/learning-image";

interface LearningImageRequest {
  courseId?: string;
}

function readCourseId(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }
  const courseId = (payload as LearningImageRequest).courseId;
  return typeof courseId === "string" ? courseId : null;
}

export async function POST(request: Request) {
  const courseId = readCourseId(await request.json().catch(() => null));
  if (!courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
  }

  const course = getLearningCourse(courseId);
  if (!course) {
    return NextResponse.json({ error: "Unknown learning course" }, { status: 404 });
  }

  if (process.env.ENABLE_LEARNING_IMAGE !== "true") {
    return NextResponse.json(
      { error: "Learning image generation disabled. Set ENABLE_LEARNING_IMAGE=true to enable.", placeholder: true },
      { status: 503 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured", placeholder: true }, { status: 503 });
  }

  try {
    const prompt = buildLearningImagePrompt(course);
    const result = await generateLearningImage(prompt, apiKey);
    return NextResponse.json({
      image: result.image,
      model: result.model,
      modelLabel: imageModelLabel(result.model),
      prompt
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate learning image";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
