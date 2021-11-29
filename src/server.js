import express from "express";
import * as db from "./db.js";
import rootRouter from "./routers/rootRouter";

db.init();

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", rootRouter);

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`)
);
