const { sequelize } = require("../../models");

const getUserTweets = (Post, User, Likes) => {
  return async (req, res) => {
    const tweets = await Post.findAll({
      where: { userId: req.params.id || req.user.user_id },
      include: [
        {
          model: Post,
          as: "reposts",
          attributes: [[sequelize.fn("COUNT", "reposts.id"), "repostsCount"]],
        },
        {
          model: Post,
          as: "comments",
          attributes: [[sequelize.fn("COUNT", "comments"), "commentsCount"]],
        },
        {
          model: User,
          as: "user",
          attributes: ["username", "displayName", "profilePicUrl"],
        },
        {
          model: Likes,
          as: "likes",
          attributes: [[sequelize.fn("COUNT", "likes.id"), "likesCount"]],
        },
      ],
      group: ["Post.id", "user.id", "likes.id", "reposts.id", "comments.id"],
      order: [["postedAt", "DESC"]],
    });

    if (!tweets) throw "fetch User tweet failed";

    res.status(200).json(tweets);
  };
};

module.exports = getUserTweets;
