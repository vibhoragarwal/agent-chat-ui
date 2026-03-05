import type { Message } from "@langchain/langgraph-sdk";

const BRACED_PLACEHOLDER_REGEX = /^\s*\{NEXT:[^}]+\}\s*$/i;
const NON_RENDERABLE_CHARS_REGEX = /^["'`]+$/;

function isNextPlaceholderJson(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length !== 1) return false;
  const [key] = entries[0];
  return key.trim().toUpperCase() === "NEXT";
}

function isDelegationPlaceholder(text: string): boolean {
  const trimmed = text.trim();
  if (BRACED_PLACEHOLDER_REGEX.test(trimmed)) {
    return true;
  }

  try {
    const parsed = JSON.parse(trimmed);
    return isNextPlaceholderJson(parsed);
  } catch {
    return false;
  }
}

function normalizeTextBlocks(texts: string[]): string {
  const filteredTexts = texts.filter((text) => {
    const trimmed = text.trim();
    if (isDelegationPlaceholder(trimmed)) {
      return false;
    }
    return trimmed.length > 0;
  });

  if (filteredTexts.length > 0) {
    return filteredTexts.join(" ");
  }

  return "";
}

/**
 * Extracts a string summary from a message's content, supporting multimodal (text, image, file, etc.).
 * - If text is present, returns the joined text.
 * - If not, returns a label for the first non-text modality (e.g., 'Image', 'Other').
 * - If unknown, returns 'Multimodal message'.
 */
export function getContentString(content: Message["content"]): string {
  if (typeof content === "string") {
    return normalizeTextBlocks([content]);
  }
  const texts = content
    .filter((c): c is { type: "text"; text: string } => c.type === "text")
    .map((c) => c.text);
  return normalizeTextBlocks(texts);
}

export function hasRenderableText(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (NON_RENDERABLE_CHARS_REGEX.test(trimmed)) return false;
  return true;
}
