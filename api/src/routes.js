const {Router} = require("express");

const clientController = require("./controllers/clientController");
const businessController = require("./controllers/businessController");
const delivererController = require("./controllers/delivererController");
const deliveryController = require("./controllers/deliveryController");
const productController = require("./controllers/productController");
const orderController = require("./controllers/orderController");

const routes = Router();

routes.post("/client/login", clientController.login);
routes.post("/client/add", clientController.create);
routes.post("/client/list", clientController.list);
routes.post("/client/get", clientController.get);
routes.post("/client/remove", clientController.remove);

routes.post("/business/login", businessController.login);
routes.post("/business/add", businessController.create);
routes.post("/business/list", businessController.list);
routes.post("/business/get", businessController.get);
routes.post("/business/remove", businessController.remove);

routes.post("/deliverer/login", delivererController.login);
routes.post("/deliverer/add", delivererController.create);
routes.post("/deliverer/list", delivererController.list);
routes.post("/deliverer/get", delivererController.get);
routes.post("/deliverer/remove", delivererController.remove);

routes.post("/delivery/add", deliveryController.create);
routes.post("/delivery/list", deliveryController.list);
routes.post("/delivery/get", deliveryController.get);
routes.post("/delivery/remove", deliveryController.remove);

routes.post("/order/add", orderController.create);
routes.post("/order/list", orderController.list);
routes.post("/order/get", orderController.get);
routes.post("/order/remove", orderController.remove);

routes.post("/product/add", productController.create);
routes.post("/product/list", productController.list);
routes.post("/product/get", productController.get);
routes.post("/product/remove", productController.remove);



module.exports = routes;
