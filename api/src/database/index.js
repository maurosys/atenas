const Sequelize = require("sequelize");
const config = require("../config/database");

const Client = require("../models/Client");
const Business = require("../models/Business");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Deliveres = require("../models/Deliveres");
const Deliveries = require("../models/Deliveries");

const connection = new Sequelize(config);

Client.init(connection);

module.exports = connection;
