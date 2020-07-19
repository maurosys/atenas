const Business = require("./Business");
const Client = require("./Client");
const Product = require("./Product");
const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        client_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: Client,
            key: 'id'
          }
        },
        business_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: Business,
            key: 'id'
          }
        },
        product_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: Product,
            key: 'id'
          }
        },
        price: {
          allowNull: false,
          type: DataTypes.DECIMAL(10,2)
        },
        amount: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        status: {
          allowNull: false,
          type: DataTypes.STRING
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Order;
