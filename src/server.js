import express from "express";
import session from "express-session";
import * as db from "./db.js";
import rootRouter from "./routers/rootRouter";
import movieRouter from "./routers/movieRouter";

db.init();

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "Lorem Ipsum",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  res.locals.loggedIn = req.session.loggedIn;
  next();
});

app.use("/", rootRouter);
app.use("/movie", movieRouter);

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`)
);
