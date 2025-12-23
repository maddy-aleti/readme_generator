import express from "express";
import githubRoutes from "./github.routes.js";
import readmeRoutes from "./readme.routes.js";

const router = express.Router();

router.use("/github", githubRoutes);
router.use("/readme", readmeRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default router;
