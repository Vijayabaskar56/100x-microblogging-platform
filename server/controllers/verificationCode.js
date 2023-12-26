const verificationCode = (Users) => {
  return async (req, res) => {
    const { email } = req.body;
    // const code = req.headers.verificationCode;
    console.log(req.headers);
    await Users.update(
      { emailVerifiedAt: Date.now() },
      { where: { email: email } }
    );

    res
      .status(200)
      .json({ status: "sucess", message: "Email verification succeded" });
  };
};

module.exports = verificationCode;
