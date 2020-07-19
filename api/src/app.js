"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const routes = require("./routes");
// import "./config/db";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(routes);

module.exports = app;
