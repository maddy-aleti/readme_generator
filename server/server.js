import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import githubRouter from './routes/github.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app=express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views",path.join(__dirname,"templates"));
app.set("view engine","ejs");

app.use("/api/github",githubRouter);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})