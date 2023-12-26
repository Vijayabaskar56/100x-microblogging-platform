const { sequelize } = require("../../models");

const feed = (Post, User, Likes, Op) => {
  return async (req, res) => {
    // const { user } = req;
    const tweets = await Post.findAll({
      where: { content: { [Op.ne]: null } },
      include: [
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
        {
          model: Post,
          as: "reposts",
          attributes: [[sequelize.fn("COUNT", "reposts.id"), "repostsCount"]],
        },
      ],
      group: ["Post.id", "user.id", "likes.id", "reposts.id"],
    });

    res.status(200).json(tweets);
  };
};

module.exports = feed;
