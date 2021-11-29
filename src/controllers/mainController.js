export const home = (req, res) => {
  return res.render("home");
};

export const signUp = (req, res) => {
  const { name, id, password } = req.body;
  console.log(req.body);
  // DB에 이미 존재하는 id인지 확인
  // 존재하지 않는다면 user 생성
};

export const login = (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  // DB에 존재하는 id인지 확인
  // 존재한다면 id와 password가 일치하는지 확인
  // 일차한다면 로그인
};
