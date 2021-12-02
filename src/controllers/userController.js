export const signUp = (req, res) => {
  const { name, id, password } = req.body;
  console.log(req.body);
  // DB에 이미 존재하는 id인지 확인
  // 존재하지 않는다면 user 생성 (user 테이블에 insert 해주기)
  req.session.loggedIn = true;
  return res.redirect("/");
};

export const login = (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  // DB에 존재하는 id인지 확인
  // 존재한다면 id와 password가 일치하는지 확인
  // 일치한다면 해당 user의 정보 리턴
  req.session.loggedIn = true;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
