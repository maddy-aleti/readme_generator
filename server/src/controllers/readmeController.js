import { buildReadme } from "../templates/readme.template.js";

export function generateReadme(req, res) {
  const markdown = buildReadme(req.body);
  res.json({ markdown });
}
