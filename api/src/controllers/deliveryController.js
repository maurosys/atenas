const Client = require("../models/Client");
const Delivery = require("../models/Delivery");

module.exports = {
  async create(req, res) {
    try {
      const result = await Delivery.create(req.body);

      console.log(`result: ${result}`);

      return res.json({status: "ok", result});
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async list(req, res) {
    try {
      const result = await Delivery.findAll({include: ["deliverer","order"]});


      let returnData = [];
      result.forEach((item) => {
        returnData.push({
          id: item.id,
          delivererName: item.deliverer.name,
          clientName: item.order.getClient().name,
          sequence: item.sequence,
          status: item.status,
        });
        console.log(item);
        }
      );

      //console.log(`result: ${returnData}`);

      return res.json({status: "ok", returnData});
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async get(req, res) {
    try {
      const result = await Delivery.findByPk(req.body.id);

      console.log(`result: ${result}`);

      if (result == null) {
        return res.json({status: "fail", message: "not found"});
      } else {
        return res.json({status: "ok", result});
      }

    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async remove(req, res) {
    try {
      const result = await Delivery.destroy({
        where: {id: req.body.id}
      });

      if (result) {
        return res.json({status: "ok", result});
      } else {
        return res.json({status: "fail", message: "not found"});
      }
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  }
};
