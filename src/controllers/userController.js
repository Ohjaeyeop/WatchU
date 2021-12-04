import { searchUserById, signUpDb, logIn, searchUserByIdWithReview } from "../db.js";

export const signUp = (req, res) => {
  const { name, id, password } = req.body;
  console.log(req.body);

  searchUserById(id, function (err, result) {
    if (err) throw err;
    else if (result.length == 0) {
      // 없는 id면 sign up
      signUpDb(id, name, password, function (err, result) {
        if (err) throw err;
        else return res.redirect("/");
      });
    } else throw "already exist";
  });
};

export const login = (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);

  logIn(id, password, function (err, result) {
    if (result.length === 0) return res.redirect("/");
    else {
      req.session.loggedIn = true;
      req.session.user = result;
      console.log(result);
      return res.redirect("/");
    }
  });
  // DB에 존재하는 id인지 확인
  // 존재한다면 id와 password가 일치하는지 확인
  // 일치한다면 해당 user의 정보 리턴
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const mypage = (req, res) => {
  const { id } = req.params;

  searchUserByIdWithReview(id, function (err, result) {
    if (err) throw err;
    else {
      console.log(result);
      return res.render("mypage");
    }
  });
  // id로 user 검색해서 해당 유저 리턴
  // 해당 유저가 작성한 리뷰, 리뷰를 남긴 영화 정보도 필요함.
};
