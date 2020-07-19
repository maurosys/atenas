const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        client_cpf: DataTypes.STRING,
        company_cnpj: DataTypes.STRING,
        date: DataTypes.STRING,
        price: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        status: DataTypes.STRING,
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

modules.exports = Order;
