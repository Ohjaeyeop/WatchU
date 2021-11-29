import mysql from "mysql";
import fs from "fs";

export function init() {
    const con = mysql.createConnection({
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

    con.changeUser({ database: 'testdb' }, function (err) {
        if (err) throw err;
        console.log("DB is reconnected ✅");
    });

    insertUser(con);
    insertMovie(con);
}

function insertUser(con) {
    var user_data = fs.readFileSync('data/users.csv', 'utf8').toString().split("\n");
    var create_user_sql = "CREATE TABLE watchu_user (id INT PRIMARY KEY, name VARCHAR(255), password VARCHAR(255),  gender VARCHAR(255), age INT)";
    con.query(create_user_sql, function (err, result) {
        if (err) throw err;
        console.log("User Table created");

    });
    var array = [];
    for (var i of user_data) {
        var tmp1 = i.split(",").slice(0, 3);
        var tmp2 = [Number(tmp1[0]), "john", "yain1015", tmp1[1], Number(tmp1[2])];
        array.push(tmp2);
    }
    var sql = "INSERT INTO watchu_user (id,name,password,gender,age) VALUES ?";
    con.query(sql, [array], function (err) {
        if (err) throw err;
        console.log("User inserted");
    });
}

function insertMovie(con) {
    var movie_data = fs.readFileSync('data/movies_corrected.csv', 'utf8').toString().split("\n");
    var create_movie_sql = "CREATE TABLE movie (id INT PRIMARY KEY, title VARCHAR(255), genre VARCHAR(255))";
    con.query(create_movie_sql, function (err, result) {
        if (err) throw err;
        console.log("Movie Table created");

    });
    var array = [];
    for (var i of movie_data) {
        var tmp1 = i.split(",");
        var tmp2 = [Number(tmp1[0]), tmp1[1], tmp1[2]];
        array.push(tmp2);
    }
    var sql = "INSERT INTO movie (id,title,genre) VALUES ?";
    con.query(sql, [array], function (err) {
        if (err) throw err;
        console.log("Movie inserted");
    });
}


