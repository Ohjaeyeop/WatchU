import mysql from "mysql";

export function init() {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ojy5002!@",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("DB is Connected ✅");
  });
}
