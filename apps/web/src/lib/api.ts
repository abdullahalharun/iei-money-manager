export async function apiFetch<T>(
  url: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (options.token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${options.token}`;
  }

  const res = await fetch(`${base}${url}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || `Request failed with ${res.status}`);
  }

  return (await res.json()) as T;
}
