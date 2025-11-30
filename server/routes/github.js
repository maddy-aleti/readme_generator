import express from "express";
import fetch from "node-fetch";

const router=express.Router();

async function fetchJson(url, headers = {} ){
    const res= await fetch(url,{ headers });
    if(!res.ok){
        throw new Error(`Github Error: ${res.status}`);
    }
    return res.json();
}

router.get("/user/:username",async(req,res)=>{
    const username=req.params.username;

    try{
        const headers= { "User-Agent" : "readme-generator-app"};
        if(process.env.GITHUB_TOKEN){
            headers.Authorization=`token ${process.env.GITHUB_TOKEN}`;
        }

        //Fetch user
        const user =await fetchJson(
            `https://api.github.com/users/${username}`,
            headers
        );

        //Fetch repos
        const repos=await fetchJson(
            `https://api.github.com/users/${username}/repos?per_page=100`,
            headers
        );

        //prepare top repos
        const topRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        stars: r.stargazers_count,
        desc: r.description || "",
        language: r.language,
      }));
      const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];

      res.json({
      user,
      repos: topRepos,
      languages,
    });
    } catch(err){
        res.status(404).json({ error: "User not found" });
    }
});

router.post("/generate", (req, res) => {
  const data = req.body;

  res.render("readme", { data }, (err, md) => {
    if (err) return res.status(500).json({ error: "Template error" });

    res.json({ markdown: md });
  });
});

export default router;
