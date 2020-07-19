const Sequelize = require("sequelize");
const config = require("../config/database");

const Client = require("../models/Client");
const Business = require("../models/Business");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Deliverer = require("../models/Deliverer");
const Delivery = require("../models/Delivery");

const models = [Client, Business, Product, Order, Deliverer, Delivery];

const connection = new Sequelize(config);

// inicializa a conexão para os models
models.map(model => model.init(connection));

// define os relacionamentos entre as tabelas/models
Client.hasMany(Order, {as: "orders", foreignKey: "client_id"});
Order.belongsTo(Client, {as: "client", foreignKey: "client_id"});
Business.hasMany(Order, {as: "orders", foreignKey: "business_id"});
Order.belongsTo(Business, {as: "business", foreignKey: "business_id"});
Deliverer.hasMany(Delivery, {as: "deliveries", foreignKey: "deliverer_id"});
Delivery.belongsTo(Deliverer, {as: "deliverer", foreignKey: "deliverer_id"});
Order.hasMany(Delivery, {as: "deliveries", foreignKey: "order_id"});
Delivery.belongsTo(Order, {as: "order", foreignKey: "order_id"});
Product.hasMany(Order, {as: "orders", foreignKey: "product_id"});
Order.belongsTo(Product, {as: "product", foreignKey: "product_id"});

console.log('inicializou models');

module.exports = connection;
