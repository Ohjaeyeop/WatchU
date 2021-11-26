import express from "express";
import path from "path";
import * as db from "./db.js"

db.init();

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/home.html"))
);

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`)
);
