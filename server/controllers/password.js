const generateToken = require("../handler/generateToken");

const password = (User, bcrpyt) => {
  return async (req, res) => {
    try {
      const { email, password } = req.body;
      const getUser = await User.findOne({ where: { email: email } });

      if (!getUser) {
        return res.status(400).json({
          status: "failed",
          message: "User not found",
        });
      }

      console.log(req.body, getUser);
      const hashedPassword = await bcrpyt.hash(String(password), 7);

      const authToken = generateToken(getUser);
      const authSessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

      await User.update(
        {
          password: hashedPassword,
          authToken: authToken,
          authSessionExpiry: authSessionExpiry,
        },
        { where: { email: email } }
      );

      res.status(200).json({
        status: "Success",
        message: "User Created successfully",
        accessToken: authToken,
        userid: getUser.id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "failed",
        message: "password setting failed",
      });
    }
  };
};

module.exports = password;
