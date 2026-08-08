import express from "express";
import 'dotenv/config';
import { urlRouter } from "./routes/urlRouter.js";
import { redirectUrl } from "./routes/urlController.js";
const port = Number(process.env.PORT) || 3000;
const app = express();
app.use(express.json());
app.use('/api', urlRouter);
app.get('/:code', redirectUrl);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map