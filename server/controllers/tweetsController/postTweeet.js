const postTweet = (Post, Likes) => {
  return async (req, res) => {
    const { userId, content } = req.body;

    try {
      await Post.create({
        userId: userId,
        content: content,
        postedAt: Date.now(),
      }).then(async (res) => {
        console.log(res.id);
        await Likes.create({
          postId: res.id,
          likedBy: userId,
          likedAt: Date.now(),
        });
      });

      res
        .status(200)
        .json({ status: "sucess", message: "Tweet posted successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: "failed", message: "Post tweet failed" });
    }
  };
};

module.exports = postTweet;
