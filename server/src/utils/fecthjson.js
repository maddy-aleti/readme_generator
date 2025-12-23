import fetch from "node-fetch";

export async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`GitHub API Error ${res.status}`);
  }

  return res.json();
}
