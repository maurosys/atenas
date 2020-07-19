const {Model, DataTypes} = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        category: {
          allowNull: false,
          type: DataTypes.STRING
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        description: {
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

module.exports = Product;
