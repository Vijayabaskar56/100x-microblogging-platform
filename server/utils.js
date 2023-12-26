const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    console.log(token);
    jwt.verify(token, process.env.jwt_salt, (err, decode) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "UN Authorized" });
      } else {
        req.user = decode;
        console.log(decode, req.user);
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Token Not Found" });
  }
};

// module.exports = generateToken;
module.exports = isAuth;
