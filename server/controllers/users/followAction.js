const followAction = (FollowAction) => {
  return async (req, res) => {
    const { userId, followedId } = req.body;
    try {
      const followAction = await FollowAction.findOne({
        where: {
          followerId: userId,
          followedId: followedId,
        },
      });

      if (followAction) {
        await FollowAction.destroy({
          where: {
            followerId: userId,
            followedId: followedId,
          },
        });

        res.status(200).json({
          status: "success",
          followStatus: false,
          message: "Unfollowed successfully",
        });
      } else {
        await FollowAction.create({
          followerId: userId,
          followedId: followedId,
          followedAt: Date.now(),
        });

        res.status(200).json({
          status: "success",
          followStatus: true,
          message: "Followed successfully",
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

module.exports = followAction;
