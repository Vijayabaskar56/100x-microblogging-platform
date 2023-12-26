// var nodemailer = require("nodemailer");

const mailHanlder = require("../handler/mailHandler");

// const transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "7409abb299c423",
//     pass: "b1cc8646397ece",
//   },
// });

const registeration = (User) => {
  return async (req, res) => {
    const { username, email, dateOfBirth } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, try login" });
    }

    const next = async () => {
      try {
        await User.create({
          username,
          displayName: username,
          email,
          dateOfBirth,
        });
        return res.json({ status: "Created successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Something went wrong" });
      }
    };

    await mailHanlder(req, res, next);
  };
};

module.exports = registeration;
