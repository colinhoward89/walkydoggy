const config = require("./config");
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const router = require("./router");
const mongoConnection = require("./models/index");

const corsConfig = {
  origin: config.corsOrigin,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(
  session({
    name: "sid",
    saveUninitialized: false,
    resave: false,
    secret: "not secure!",
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(router);
app.get("*", (req, res) => {
  res.status(404).send("Sorry, not found 😞");
});

app.listen(config.PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🚀 Server is listening on port ${config.PORT}!`);
  }
});
