const { Router } = require("express");

const clientController = require("./controllers/clientController");

const routes = Router();

routes.post("/client", clientController.create);

routes.post("/company", companyController.create);
routes.post("/company", companyController.login);

routes.post("/product", productController.create);
routes.delete("/product/:id", productController.delete);

routes.post("/order", orderController.create);
routes.delete("/order", orderController.delete);

module.exports = routes;
