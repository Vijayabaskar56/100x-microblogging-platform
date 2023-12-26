const healthcheck = (db) => {
  return async (req, res) => {
    try {
      await db.sequelize.authenticate();
      res.status(200).json({ status: "Sucessfully connected" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "failed to connect" });
    }
  };
};

module.exports = healthcheck;
