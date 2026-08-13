import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';
import { urlRouter } from "./routes/urlRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port: number = Number(process.env.PORT) || 3000;
const app = express();
// server middelware
app.use(express.json(
    {limit:'20kb'}
));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "view")));

// API routes
app.use('/api', urlRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


