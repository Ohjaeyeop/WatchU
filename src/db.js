import mysql from "mysql";
import fs from "fs";
import e from "express";

var con;
var genre_map = {
    "Action": 1, "Adventure": 2, "Animation": 3, "Children's": 4, "Comedy": 5, "Crime": 6, "Documentary": 7, "Drama": 8, "Fantasy": 9,
    "Film-Noir": 10, "Horror": 11, "Musical": 12, "Mystery": 13, "Romance": 14, "Sci-Fi": 15, "Thriller": 16, "War": 17, "Western": 18
};


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
}

export function searchUserByIdWithReview(id, callback) {
    var review_sql = `SELECT * FROM review WHERE user_id=\"${id}\"`;

    con.query(review_sql, function (err, result) {
        if (err) throw err;
        else {
            var user_sql = `SELECT * FROM movie WHERE id IN (SELECT movie_id FROM user_movie WHERE user_id=\"${id}\")`;
            con.query(user_sql, function (err, result_1) {
                if (err) callback(err, null);
                else {
                    callback(null, { "reviews": result, "movies": result_1 });
                }
            });
        }
    });
}

export function writeReview(rate, comment, user_id, movie_id, callback) {
    var sql = `INSERT INTO review (rating, comment, user_id, movie_id) VALUES (${rate}, "${comment}", "${user_id}", ${movie_id})`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        else {
            var sql = `INSERT INTO user_movie (user_id, movie_id) VALUES ("${user_id}", ${movie_id})`;

            con.query(sql, function (err, result) {
                if (err) callback(err, null);
                else callback(null, result);
            });
        }
    });
}

export function logIn(id, password, callback) {
    var sql = `SELECT * FROM watchu_user WHERE id=\"${id}\" and password=\"${password}\"`;

    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

export function signUpDb(id, name, password, callback) {
    var sql = `INSERT INTO watchu_user (id, name, password) VALUES (\"${id}\",\"${name}\",\"${password}\")`;

    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

export function searchUserById(id, callback) {
    var sql = `SELECT * FROM watchu_user WHERE id=\"${id}\"`;

    con.query(sql, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}

export function searchMovieById(id, callback) {
    var sql = `SELECT * FROM movie WHERE id=${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        else {
            var sql2 = `SELECT * FROM genre WHERE id IN (SELECT genre_id FROM movie_genre WHERE movie_id=${id})`
            con.query(sql2, function (err, result1) {
                if (err) callback(err, null);
                else {
                    var genres = [];
                    for (var data of result1) {
                        genres.push(data.name);
                    }
                    result[0].genres = genres;
                    callback(null, result);
                }
            });
        }
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
    var create_director_sql =
        "CREATE TABLE director (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
    con.query(create_director_sql, function (err, result) {
        if (err) throw err;
        console.log("Director Table created");
    });
    var create_movie_sql =
        "CREATE TABLE movie (id INT PRIMARY KEY, title VARCHAR(255), year VARCHAR(255), rating FLOAT, poster VARCHAR(255), director_id INT, FOREIGN KEY (director_id) REFERENCES director(id))";
    con.query(create_movie_sql, function (err, result) {
        if (err) throw err;
        console.log("Movie Table created");
    });
    var create_review_sql =
        "CREATE TABLE review (id INT AUTO_INCREMENT PRIMARY KEY, rating FLOAT, comment VARCHAR(255), user_id VARCHAR(255), movie_id INT, FOREIGN KEY (user_id) REFERENCES watchu_user(id), FOREIGN KEY (movie_id) REFERENCES movie(id))";
    con.query(create_review_sql, function (err, result) {
        if (err) throw err;
        console.log("Review Table created");
    });
    var create_actor_sql =
        "CREATE TABLE actor (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
    con.query(create_actor_sql, function (err, result) {
        if (err) throw err;
        console.log("Actor Table created");
    });
    var create_genre_sql =
        "CREATE TABLE genre (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
    con.query(create_genre_sql, function (err, result) {
        if (err) throw err;
        console.log("Genre Table created");
    });
    var create_user_movie_sql =
        "CREATE TABLE user_movie (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), movie_id INT, FOREIGN KEY (user_id) REFERENCES watchu_user(id), FOREIGN KEY (movie_id) REFERENCES movie(id))";
    con.query(create_user_movie_sql, function (err, result) {
        if (err) throw err;
        console.log("User_Movie Table created");
    });
    var create_movie_genre_sql =
        "CREATE TABLE movie_genre (id INT AUTO_INCREMENT PRIMARY KEY, movie_id INT, genre_id INT, FOREIGN KEY (movie_id) REFERENCES movie(id), FOREIGN KEY (genre_id) REFERENCES genre(id))";
    con.query(create_movie_genre_sql, function (err, result) {
        if (err) throw err;
        console.log("Movie_Genre Table created");
    });
    var create_movie_actor_sql =
        "CREATE TABLE movie_artis (id INT AUTO_INCREMENT PRIMARY KEY, movie_id INT, actor_id INT, FOREIGN KEY (movie_id) REFERENCES movie(id), FOREIGN KEY (actor_id) REFERENCES actor(id))";
    con.query(create_movie_actor_sql, function (err, result) {
        if (err) throw err;
        console.log("Movie_Actor Table created");
    });
}

function insertData() {
    var sql =
        'INSERT INTO genre (name) VALUES ("Action"),("Adventure"),("Animation"),("Children\'s"),("Comedy"),("Crime"),("Documentary"),("Drama"),("Fantasy"),("Film-Noir"),("Horror"),("Musical"),("Mystery"),("Romance"),("Sci-Fi"),("Thriller"),("War"),("Western")';
    con.query(sql, function (err) {
        if (err) throw err;
        console.log("Genre inserted");
    });

    var movie_data = fs
        .readFileSync("data/movie.dat", "utf8")
        .toString()
        .split("\n");
    var movie_array = [];
    var genre_array = [];
    for (var i of movie_data) {
        var movie = i.split("::");
        var genres = movie[3].split("|");
        for (var genre of genres) {
            genre_array.push([parseInt(movie[0]), genre_map[genre]])
        }
        movie_array.push([
            parseInt(movie[0]),
            movie[1],
            movie[2],
            parseFloat(movie[4]),
            movie[5],
        ]);
    }

    var movie_sql = "INSERT INTO movie (id,title,year,rating,poster) VALUES ?";
    con.query(movie_sql, [movie_array], function (err) {
        if (err) throw err;
        console.log("Movie inserted");
    });

    var genre_sql = `INSERT INTO movie_genre (movie_id,genre_id) VALUES ?`
    con.query(genre_sql, [genre_array], function (err) {
        if (err) throw err;
        console.log("Movie_Genre inserted");
    });

    var user_sql =
        'INSERT INTO watchu_user (id, name, password) VALUES ("yain20301","SangJune","yain1015"), ("woduq","Jaeyeop","1234")';
    con.query(user_sql, function (err) {
        if (err) throw err;
        console.log("User inserted");
    });
}
