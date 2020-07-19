const Client = require("../models/client");

module.exports = {
  async create(req, res) {
    try {
      const result = await Client.create(req.body);

      console.log(`result: ${result}`);

      return res.json({ status: "ok", result });
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({ status: "error", error: err });
    }
  },
};
