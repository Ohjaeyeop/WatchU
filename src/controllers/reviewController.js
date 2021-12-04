import { writeReview } from "../db.js";

export const postReview = (req, res) => {
  const { rate, comment } = req.body; // 평점과 코멘트
  const { id: movieId } = req.params; // 평점을 남긴 영화의 id
  const user = req.session.user; // 평점을 남긴 유저 정보

  console.log(movieId);
  console.log(user);
  console.log(rate, comment);

  writeReview(rate, comment, user[0]["id"], movieId, function (err, result) {
    if (err) throw err;
    else {
      return res.redirect(`/movie/${movieId}`);
    }
  });
  // review 테이블에 rate, comment를 이용해서 insert
  // 해당 영화와 review 연결  (one to many)
  // 해당 유저와 review 연결  (one to many)
  // 해당 유저와 영화 연결  (many to many)
};
