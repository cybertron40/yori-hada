import { request } from "undici";

interface FetchOptions {
  timeoutMs?: number;
  userAgent?: string;
}

export async function fetchHtml(url: string, options: FetchOptions = {}) {
  const { timeoutMs = 10000, userAgent = "RecipeAtlasBot/0.1" } = options;

  const response = await request(url, {
    method: "GET",
    headers: {
      "user-agent": userAgent,
      accept: "text/html,application/xhtml+xml",
      "accept-language": "en-US,en;q=0.9"
    },
    maxRedirections: 3,
    bodyTimeout: timeoutMs,
    headersTimeout: timeoutMs
  });

  if (response.statusCode >= 400) {
    throw new Error(`Failed to fetch recipe: ${response.statusCode}`);
  }

  const contentType = response.headers["content-type"] ?? "";
  if (Array.isArray(contentType)) {
    if (!contentType.some((type) => type.includes("text/html"))) {
      throw new Error(`Unsupported content-type: ${contentType.join(",")}`);
    }
  } else if (!contentType.includes("text/html")) {
    throw new Error(`Unsupported content-type: ${contentType}`);
  }

  return response.body.text();
}
