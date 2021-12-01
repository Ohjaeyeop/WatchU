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


    // searchMovieByTitle("The", function (err, result) {
    //     if (err) throw err;
    //     else console.log(result);
    // });

    // searchAllMovie(function (err, result) {
    //     if (err) throw err;
    //     else console.log(result);
    // });


    // var id = "yain20301";
    // var name_g = "SangJune";
    // var password = "yain1015";


    // searchUserById(id, function (err, result) {
    //     if (err) throw err;
    //     else if (result.length == 0) {
    //         signUpDb(id, name_g, password, function (err, result) {
    //             if (err) throw err;
    //             else console.log("Sign Up!");
    //         })
    //     }
    //     else console.log("Already exist");
    // });

    // logIn(id, password, function (err, result) {
    //     if (err) throw err;
    //     else console.log(result);
    // });

    // searchMovieById(1, function (err, result) {
    //     if (err) throw err;
    //     else console.log(result);
    // });
}

export function logIn(id, password, callback) {
    var sql = `SELECT * FROM watchu_user WHERE id=\"${id}\" and password=\"${password}\"`

    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}


export function signUpDb(id, name, password, callback) {
    var sql = `INSERT INTO watchu_user (id, name, password) VALUES (\"${id}\",\"${name}\",\"${password}\")`

    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

export function searchUserById(id, callback) {
    var sql = `SELECT * FROM watchu_user WHERE id=\"${id}\"`

    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

export function searchMovieById(id, callback) {
    var sql = `SELECT * FROM movie WHERE id=${id}`;
    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

export function searchMovieByTitle(title, callback) {
    var sql = `SELECT * FROM movie WHERE title LIKE \"%${title}%\"`;
    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

export function searchAllMovie(callback) {
    var sql = "SELECT * FROM movie";
    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

function createTables() {
    var create_user_sql =
        "CREATE TABLE watchu_user (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), password VARCHAR(255))";
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

    var sql = "INSERT INTO watchu_user (id, name, password) VALUES (\"yain20301\",\"SangJune\",\"yain1015\")";
    con.query(sql, function (err) {
        if (err) throw err;
        console.log("User inserted");
    });
}
