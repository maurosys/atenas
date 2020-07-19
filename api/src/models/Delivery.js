const Order = require("./Order");
const Deliverer = require("./Deliverer");
const {Model, DataTypes} = require("sequelize");

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        order_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: Order,
            key: 'id'
          }
        },
        deliverer_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: Deliverer,
            key: 'id'
          }
        },
        sequence: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        // status: {
        //   allowNull: false,
        //   type: DataTypes.STRING
        // },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Delivery;
