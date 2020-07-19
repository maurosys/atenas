const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
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

modules.exports = Client;
