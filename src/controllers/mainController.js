import { render } from "ejs";
import {
  searchMovieByTitle,
  searchAllMovie,
  searchUserById,
  signUpDb,
  logIn,
  searchMovieById,
} from "../db.js";

export const home = (req, res) => {
  // 모든 영화 리스트 db에서 가져오기
  searchAllMovie(function (err, result) {
    if (err) throw err;
    else {
      return res.render("home", { movies: result });
    }
  });
};

export const search = (req, res) => {
  const { title } = req.query;

  searchMovieByTitle(title, function (err, result) {
    if (err) throw err;
    else {
      return res.render("search", { movies: result });
    }
  });

  // title로 DB에서 영화 검색하기
  // 해당 영화 정보 리턴
};

export const signUp = (req, res) => {
  const { name, id, password } = req.body;
  console.log(req.body);

  searchUserById(id, function (err, result) {
    if (err) throw err;
    else if (result.length == 0) {
      // 없는 id면 sign up
      signUpDb(id, name, password, function (err, result) {
        if (err) throw err;
        else return res.render("signUp", { message: "Sign Up" });
      });
    } else return res.render("signUp", { message: "Already exist" }); // 이미 존재하는 id
  });

  // DB에 이미 존재하는 id인지 확인
  // 존재하지 않는다면 user 생성 (user 테이블에 insert 해주기)
};

export const login = (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);

  logIn(id, password, function (err, result) {
    if (err) throw err;
    else return res.render("login", { user: result });
  });
  // DB에 존재하는 id인지 확인
  // 존재한다면 id와 password가 일치하는지 확인
  // 일치한다면 해당 user의 정보 리턴
};

export const detail = (req, res) => {
  const { id } = req.params;
  console.log(id);

  // id로 영화검색 후 해당 영화정보 리턴
  searchMovieById(id, function (err, result) {
    if (err) throw err;
    else return res.render("detail", { movie: result });
  });
};
