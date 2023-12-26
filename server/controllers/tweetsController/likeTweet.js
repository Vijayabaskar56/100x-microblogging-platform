const likeTweet = (Likes) => {
  return async (req, res) => {
    const { userId, postId } = req.body;
    try {
      // Step 1: Calculate the number of likes
      const likes = await Likes.count({
        where: {
          postId: postId,
        },
      });

      await Posts.update(
        { likeCount: likes },
        {
          where: {
            id: postId,
          },
        }
      );

      res
        .status(200)
        .json({ status: "sucess", message: "Tweet liked successfully" });
    } catch (error) {
      res.status(400).json({ status: "failed", message: "Like tweet failed" });
    }
  };
};
