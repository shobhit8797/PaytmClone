// backend/index.js
import express, { urlencoded } from "express";
import cors from "cors";

import rootRouter from "./routes/index";

const app = express();

app.use(cors());
app.use(urlencoded());

app.use("/api/v1", rootRouter);

app.listen(3000);
