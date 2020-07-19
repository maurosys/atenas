const { Model, DataTypes } = require("sequelize");

class Business extends Model {
  static init(sequelize) {
    super.init(
      {
        fantasy_name: DataTypes.STRING,
        company_name: DataTypes.STRING,
        email: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        lat: DataTypes.STRING,
        long: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

modules.exports = Business;
