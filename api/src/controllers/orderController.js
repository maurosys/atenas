const Order = require("../models/Order");

module.exports = {
  async create(req, res) {
    try {
      const result = await Order.create(req.body);

      console.log(`result: ${result}`);

      return res.json({status: "ok", result});
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async list(req, res) {
    try {
      const result = await Order.findAll({
        include: ["client", "business", "product"]
      });

      let returnData = [];
      result.forEach((item) => {
          returnData.push({
            id: item.id,
            clientName: item.client.name,
            productName: item.product.name,
            businessName: item.business.name,
            price: item.price,
            amount: item.amount,
            status: item.status,
          });
          console.log(item);
        }
      );

      return res.json({status: "ok", returnData});
    } catch (err) {
      console.error(`Error: ${err}`);

      return res.json({status: "error", error: err});
    }
  },

  async get(req, res) {
    try {
      const result = await Order.findByPk(req.body.id);

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
      const result = await Order.destroy({
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
