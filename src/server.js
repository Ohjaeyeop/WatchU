import express from "express";
import mysql from "mysql";
import path from "path";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ojy5002!@",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("DB is Connected ✅");
});

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/home.html"))
);

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT}🚀`)
);
