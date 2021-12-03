export const postReview = (req, res) => {
  const { rate, comment } = req.body; // 평점과 코멘트
  const { id: movieId } = req.params; // 평점을 남긴 영화의 id
  const user = req.session.user; // 평점을 남긴 유저 정보

  console.log(movieId);
  console.log(user);
  console.log(rate, comment);

  // review 테이블에 rate, comment를 이용해서 insert
  // 해당 영화와 review 연결  (one to many)
  // 해당 유저와 review 연결  (one to many)
  // 해당 유저와 영화 연결  (many to many)

  return res.redirect(`/movie/${movieId}`);
};
