const likePost = (Likes) => {
  return async (req, res) => {
    const { id } = req.params;
    const { likedBy } = req.body;
    console.log(id, likedBy);
    try {
      const like = await Likes.findOne({
        where: {
          postId: id,
          likedBy: likedBy,
        },
      });

      if (like) {
        await Likes.destroy({
          where: {
            postId: id,
            likedBy: likedBy,
          },
        });

        res.status(200).json({
          status: "success",
          message: "Unliked successfully",
        });
      } else {
        await Likes.create({
          postId: id,
          likedBy: likedBy,
          likedAt: Date.now(),
        });

        res.status(200).json({
          status: "success",
          message: "Liked successfully",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };
};

module.exports = likePost;
