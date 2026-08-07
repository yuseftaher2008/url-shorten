import express from "express";
import 'dotenv/config';

const port : number = Number(process.env.PORT) || 3000;
console.log(port);

const app = express();

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})


