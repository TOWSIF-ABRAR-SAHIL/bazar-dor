const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

export async function fetchWithFallback(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Primary API failed");
    return await res.json();
  } catch {
    const res = await fetch(`${BASE_URL_2}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Both APIs failed");
    return await res.json();
  }
}