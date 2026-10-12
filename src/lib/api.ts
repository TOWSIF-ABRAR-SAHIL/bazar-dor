const BASE_URL_1 = "https://openapi.programming-hero.com/api/bazardor";
const BASE_URL_2 = "https://api.api-store.workers.dev/api/bazardor";

export async function fetchWithFallback(endpoint: string) {
  const opts: RequestInit = { cache: "no-store" };
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, opts);
    if (!res.ok) throw new Error("Primary API failed");
    return await res.json();
  } catch {
    try {
      const res = await fetch(`${BASE_URL_2}${endpoint}`, opts);
      if (!res.ok) throw new Error("Fallback API failed");
      return await res.json();
    } catch {
      return [];
    }
  }
}

// slug (ex: "miniket-chal") or id (ex: "2" / 2) — jeta diyei asuk product khuje ber kore
export async function getProductBySlugOrId(slugOrId: string | string[]) {
  const key = Array.isArray(slugOrId) ? slugOrId[0] : slugOrId;
  // 1) direct try (numeric id hole API support kore)
  const direct: any = await fetchWithFallback(`/products/${key}`);
  const directData = Array.isArray(direct) ? direct[0] : direct?.data || direct;
  if (directData && (directData.id || directData.slug)) {
    // API vul id te empty array/object dey — seta filter kori
    if (!Array.isArray(direct) || direct.length > 0) {
      if (directData.slug === key || String(directData.id) === String(key)) return directData;
      // direct hit na holeo data thakle return (single-product response)
      if (directData.nameBn) return directData;
    }
  }
  // 2) fallback: sob products ene slug/id match
  const all: any = await fetchWithFallback("/products");
  const list = Array.isArray(all) ? all : all?.data || [];
  return list.find((p: any) => p.slug === key || String(p.id) === String(key)) || null;
}