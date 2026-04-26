export const DEFAULT_IMAGE_MODEL = "gpt-image-1.5";

export interface ImageGenerationPayload {
  model: string;
  prompt: string;
  size: "1024x1024";
}

interface OpenAIImageResponse {
  data?: Array<{
    b64_json?: string;
    url?: string;
  }>;
}

export interface GeneratedLearningImage {
  image: string;
  model: string;
}

export function buildImageGenerationPayload(
  prompt: string,
  model = process.env.OPENAI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL
): ImageGenerationPayload {
  return {
    model,
    prompt,
    size: "1024x1024"
  };
}

export function imageModelLabel(model: string): string {
  if (model === "gpt-image-1.5") {
    return "GPT Image 1.5";
  }
  if (model === "gpt-image-1-mini") {
    return "GPT Image 1 Mini";
  }
  if (model === "gpt-image-1") {
    return "GPT Image 1";
  }
  return model;
}

function firstImage(data: OpenAIImageResponse): string | null {
  const image = data.data?.[0];
  if (!image) {
    return null;
  }
  if (image.b64_json) {
    return `data:image/png;base64,${image.b64_json}`;
  }
  return image.url ?? null;
}

export async function generateLearningImage(prompt: string, apiKey: string): Promise<GeneratedLearningImage> {
  const payload = buildImageGenerationPayload(prompt);
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI image generation failed: ${response.status} ${detail.slice(0, 240)}`);
  }

  const data = (await response.json()) as OpenAIImageResponse;
  const image = firstImage(data);
  if (!image) {
    throw new Error("OpenAI image response did not include an image.");
  }

  return {
    image,
    model: payload.model
  };
}
