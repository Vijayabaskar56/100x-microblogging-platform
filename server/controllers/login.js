const generateToken = require("../handler/generateToken.js");
const bcrpyt = require("bcrypt");

const login = (User, bcrpyt) => {
  return async (req, res) => {
    const { email, password } = req.body;
    const getUser = await User.findOne({ where: { email: email } });
    if (!getUser) throw "UserName or Password is invalid";

    console.log(req.body, getUser, getUser.password);
    const dehashpasssword = await bcrpyt.compare(password, getUser.password);

    if (!dehashpasssword) throw "UserName or Password is invalid";

    // jwt auth
    const accessToken = generateToken(getUser);
    // Set auth session expiry
    const authSessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    // success response
    await User.update(
      { authToken: accessToken, authSessionExpiry: authSessionExpiry },
      { where: { id: getUser.id } }
    )
      .then(() => {
        res.status(200).json({
          status: "Success",
          message: "User Loged in sucessfully",
          accessToken: accessToken,
          userid: getUser.id,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({ status: "failed", message: "login failed" });
      });
  };
};

module.exports = login;
