import * as db from "../db"

export const home = (req, res) => {
  return res.render("home");
};

export const search = (req, res) => {
  const { title } = req.query;
  console.log(title);

  searchByTitle("The", function (err, result) {
    if (err)
      throw err;
    else
      console.log(result);
  });

  // title로 DB에서 영화 검색하기
  // 해당 영화 정보 리턴
};

export const signUp = (req, res) => {
  const { name, id, password } = req.body;
  console.log(req.body);
  // DB에 이미 존재하는 id인지 확인
  // 존재하지 않는다면 user 생성 (user 테이블에 insert 해주기)
};

export const login = (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  // DB에 존재하는 id인지 확인
  // 존재한다면 id와 password가 일치하는지 확인
  // 일치한다면 해당 user의 정보 리턴
};
