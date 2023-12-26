const replayTweets = (Post) => {
  return async (req, res) => {
    const { id } = req.params;
    const { userId, content } = req.body;

    console.log("id", id, "userId", userId, "content", content, " from replay");

    try {
      await Post.create({
        userId,
        content,
        replayedAt: Date.now(),
        replayToId: id,
      });

      res
        .status(200)
        .json({ status: "sucess", message: "Tweet replayed successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ status: "failed", message: "RePlay tweet failed" });
    }
  };
};

module.exports = replayTweets;
