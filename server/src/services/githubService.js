import { fetchJson } from "../utils/fetchJson.js";

export async function fetchUserAndRepos(username) {
  const headers = { "User-Agent": "readme-generator" };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const user = await fetchJson(
    `https://api.github.com/users/${username}`,
    headers
  );

  const repos = await fetchJson(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    headers
  );

  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(r => ({
      name: r.name,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language
    }));

  return {
    user: {
      name: user.name,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      avatar: user.avatar_url
    },
    topRepos
  };
}
