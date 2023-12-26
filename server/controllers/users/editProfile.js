const editProfile = (User, FollowAction) => {
  return async (req, res) => {
    const {
      displayName,
      userId,
      location,
      website,
      bio,
      profilePicUrl,
      headerPicUrl,
    } = req.body;

    try {
      await User.update(
        {
          displayName: displayName,
          location: location,
          website: website,
          bio: bio,
          location: location,
        },
        { where: { id: userId } }
      );

      if (profilePicUrl) {
        await User.update(
          { profilePicUrl: profilePicUrl },
          { where: { id: userId } }
        );
      }

      if (headerPicUrl) {
        await User.update(
          { headerPicUrl: headerPicUrl },
          { where: { id: userId } }
        );
      }

      const { user } = req;
      const getuser = await User.findOne({
        where: { id: user.user_id },
        include: [
          {
            model: FollowAction,
            as: "follower",
            attributes: ["followerId"],
            include: [
              {
                model: User,
                as: "follower",
                attributes: ["username"],
              },
            ],
          },
          {
            model: FollowAction,
            as: "following",
            attributes: ["followedId"],
            include: [
              {
                model: User,
                as: "following",
                attributes: ["username"],
              },
            ],
          },
        ],
        group: [
          "User.id",
          "follower.id",
          "following.id",
          "follower->follower.id",
          "following->following.id",
        ],
      });

      const userInfo = {
        id: getuser.id,
        username: getuser.username,
        email: getuser.email,
        displayName: getuser.displayName,
        bio: getuser.bio,
        dateofBirth: getuser.dateOfBirth,
        website: getuser.website,
        locaion: getuser.locaion,
        profilePicUrl: getuser.profilePicUrl,
        headerPicUrl: getuser.headerPicUrl,
        follower: getuser.follower,
        following: getuser.following,
        createdAt: getuser.createdAt,
      };

      res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        user: userInfo,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };
};

module.exports = editProfile;
