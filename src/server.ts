import express from "express";
import 'dotenv/config';
import { urlRouter } from "./routes/urlRouter.js";
import { redirectUrl } from "./controllers/urlController.js";

const port: number = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());
app.use('/api', urlRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


