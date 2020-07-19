const { Model, DataTypes } = require("sequelize");

class Business extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        fantasy_name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        company_name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING
        },
        phone: {
          allowNull: false,
          type: DataTypes.STRING
        },
        cnpj:{
          allowNull: false,
          type: DataTypes.STRING
        },
        address: {
          allowNull: false,
          type: DataTypes.STRING
        },
        lat: {
          allowNull: false,
          type: DataTypes.STRING,
          defalutValue: "0"
        },
        long: {
          allowNull: false,
          type: DataTypes.STRING,
          defalutValue: "0"
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Business;
