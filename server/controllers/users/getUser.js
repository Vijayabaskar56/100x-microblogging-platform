const getUser = (User, FollowAction) => {
  return async (req, res) => {
    // console.log(req.params.id, req);
    //TODO: refactor this code
    const getuser = await User.findOne({
      where: { id: req.params.id || req.user.user_id },
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

    if (!getuser) throw { message: "User Not Found" };
    res.status(200).json({ status: "Sucess", user: userInfo });
  };
};

module.exports = getUser;
