const { createClient } = require("@supabase/supabase-js");
const fs = require("fs").promises;
require("dotenv").config();
const config = require("./config/config.json");

config.production.username = process.env.DEV_USERNAME;
config.production.password = process.env.DEV_PASSWORD;
config.production.database = process.env.DEV_DATABASE;
config.production.host = process.env.DEV_HOST;

config.development.username = process.env.DEV_USERNAME;
config.development.password = process.env.DEV_PASSWORD;
config.development.database = process.env.DEV_DATABASE;
config.development.host = process.env.DEV_HOST;

const express = require("express");
require("express-async-errors");
const cors = require("cors");
const db = require("./models/index.js");
const bcrpyt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const errorHandler = require("./handler/errorHandler.js");
const { User, Post, FollowAction, Likes, Comments } = require("./models");
const healthcheck = require("./controllers/healthcheck.js");
const { generateToken } = require("./handler/generateToken.js");
const {
  registeration,
  password,
  login,
  verificationCode,
  userDetails,
  postTweet,
  repostTweet,
  replayTweets,
  editProfile,
  followAction,
  likePost,
  getUser,
  getUserTweets,
} = require("./controllers/index.js");
const feed = require("./controllers/tweetsController/feed.js");
const isAuth = require("./utils.js");

const corsOptions = {
  origin: process.env.CORZ_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow all headers
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.get("/healthcheck", healthcheck(db));
app.post("/registration", registeration(User));
app.get("/getuser/:id", userDetails(User));
app.post("/password", password(User, bcrpyt));
app.post("/verificationCode", verificationCode(User));
app.post("/login", login(User, bcrpyt));
app.post("/posts", postTweet(Post, Likes));
app.post("/posts/:id/reposts", isAuth, repostTweet(Post));
app.post("/posts/:id/replies", isAuth, replayTweets(Post));
app.get("/feed", feed(Post, User, Likes, Op));
app.get("/users/:id?", isAuth, getUser(User, FollowAction));
app.post("/editProfile", isAuth, editProfile(User, FollowAction));
app.get("/userTweets/:id?", isAuth, getUserTweets(Post, User, Likes));
app.post("/followAction", followAction(FollowAction));
app.post("/posts/:id/like", likePost(Likes));
app.post("/uploadProfile/:id", isAuth, async (req, res) => {
  await User.update(
    { profilePicUrl: req.body.imageUrl },
    { where: { id: req.params.id } }
  );
  console.log(req.body);
  res.json({
    status: "success",
    message: "File uploaded successfully!",
  });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
