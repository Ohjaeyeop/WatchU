import { searchMovieByTitle, searchAllMovie, searchMovieById } from "../db.js";

export const home = (req, res) => {
  // 모든 영화 리스트 db에서 가져오기
  searchAllMovie(function (err, result) {
    if (err) throw err;
    else {
      return res.render("home", { movies: result.slice(0, 50) });
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

export const detail = (req, res) => {
  const { id } = req.params;

  // id로 영화검색 후 해당 영화정보 리턴
  searchMovieById(id, function (err, result) {
    if (err) throw err;
    else {
      console.log(result[0]);
      return res.render("detail", { movie: result[0] });
    }
  });
};
