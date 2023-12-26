const registeration = require("./registeration");
const login = require("./login");
const password = require("./password");
const healthcheck = require("./healthcheck");
const verificationCode = require("./verificationCode");
const userDetails = require("./userDetails");
const postTweet = require("./tweetsController/postTweeet");
const repostTweet = require("./tweetsController/repostTweet");
const replayTweets = require("./tweetsController/replayTweets");
const feed = require("./tweetsController/feed");
const editProfile = require("./users/editProfile");
const followAction = require("./users/followAction");
const likePost = require("./users/likePost");
const getUser = require("./users/getUser");
const getUserTweets = require("./users/getUserTweets");

const index = {
  registeration,
  login,
  password,
  healthcheck,
  verificationCode,
  userDetails,
  postTweet,
  repostTweet,
  replayTweets,
  feed,
  editProfile,
  followAction,
  likePost,
  getUser,
  getUserTweets,
};

module.exports = index;
