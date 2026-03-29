export const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function readCache<T>(key: string): T | undefined {
  const raw = localStorage.getItem(key);
  if (!raw) return undefined;
  try {
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return undefined;
    }
    return data as T;
  } catch {
    return undefined;
  }
}

export function writeCache(key: string, data: unknown): void {
  localStorage.setItem(
    key,
    JSON.stringify({ data, expiresAt: Date.now() + CACHE_TTL_MS })
  );
}
