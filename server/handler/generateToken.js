const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = ({ id, email }) => {
  return jwt.sign(
    {
      user_id: id,
      email: email,
      iat: Date.now(),
    },
    process.env.jwt_salt,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
