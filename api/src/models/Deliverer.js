const {Model, DataTypes} = require("sequelize");

class Deliverer extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        cpf: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        phone: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        address: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        lat: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        long: {
          allowNull: false,
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Deliverer;
