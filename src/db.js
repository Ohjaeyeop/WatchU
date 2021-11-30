import mysql from "mysql";
import fs from "fs";
import e from "express";

var con;

export function init() {
  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ojy5002!@",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("DB is connected ✅");
  });

  con.query("DROP DATABASE IF EXISTS testdb", function (err, result) {
    if (err) throw err;
    console.log("DB is deleted ✅");
  });

  con.query("CREATE DATABASE testdb", function (err, result) {
    if (err) throw err;
    console.log("DB is created ✅");
  });

  con.changeUser({ database: "testdb" }, function (err) {
    if (err) throw err;
    console.log("DB is reconnected ✅");
  });

  createTables();
  insertData();

  searchByTitle("The", function (err, result) {
    if (err) throw err;
    else console.log(result);
  });
}

export function searchByTitle(title, callback) {
  var sql = `SELECT * FROM movie WHERE title LIKE \"%${title}%\"`;
  con.query(sql, function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
}

function createTables() {
  var create_user_sql =
    "CREATE TABLE watchu_user (id INT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255),  gender VARCHAR(255), age INT)";
  con.query(create_user_sql, function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });
  var create_movie_sql =
    "CREATE TABLE movie (id INT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255) ,genre VARCHAR(255), rating FLOAT, poster VARCHAR(255))";
  con.query(create_movie_sql, function (err, result) {
    if (err) throw err;
    console.log("Movie Table created");
  });
}

function insertData() {
  var movie_data = fs
    .readFileSync("data/movie.dat", "utf8")
    .toString()
    .split("\n");
  var array = [];
  for (var i of movie_data) {
    var movie = i.split("::");
    array.push([
      parseInt(movie[0]),
      movie[1],
      movie[2],
      movie[3],
      parseFloat(movie[4]),
      movie[5],
    ]);
  }
  var sql = "INSERT INTO movie (id,title,year,genre,rating,poster) VALUES ?";
  con.query(sql, [array], function (err) {
    if (err) throw err;
    console.log("Movie inserted");
  });
}
