const userDetails = (User) => {
  return async (req, res) => {
    try {
      console.log(req.body, req.params);
      const getUser = await User.findOne({
        where: { id: req.params.id },
      });
      if (!getUser) {
        return res.status(404).json({
          status: "Fail",
          message: "User not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "User Details",
        users: getUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Error",
        message: "An error occurred while retrieving user details",
      });
    }
  };
};

module.exports = userDetails;
