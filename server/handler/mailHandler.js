var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7409abb299c423",
    pass: "b1cc8646397ece",
  },
});

const mailHandler = async (req, res, next) => {
  const { email } = req.body;
  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  const mailOptions = {
    from: "twitter@gmail.com",
    to: email,
    subject: "Subject of your email",
    html: `<h1>Your html here</h2><br><p>Your Verification Code is ${verificationCode}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.cookie("verificationCode", verificationCode, {
      maxAge: 5 * 60 * 1000,
      httpOnly: false,
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send verification code" });
  }
};

module.exports = mailHandler;
