// backend/index.js
const express = require("express");
var cors = require("cors");

const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.urlencoded());

app.use("/api/v1", rootRouter);

app.listen(3000);
