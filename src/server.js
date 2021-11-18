import express from "express";
import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("DB is Connected ✅");
});

const PORT = 3000;

const app = express();

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT}🚀`)
);
