import express from "express";
import { generateReadme } from "../controllers/readme.controller.js";

const router = express.Router();

router.post("/generate", generateReadme);

export default router;
