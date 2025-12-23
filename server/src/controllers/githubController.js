import { fetchUserAndRepos } from "../services/github.service.js";

export async function getGithubProfile(req, res) {
  try {
    const data = await fetchUserAndRepos(req.params.username);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: "GitHub user not found" });
  }
}
