const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const hasRole = require("../middlewares/hasRole");

const routes = Router();

routes.post("/products", hasRole("common"), ProductController.create);
routes.get("/products", hasRole("common"), ProductController.findAll);
routes.get("/product/:id", hasRole("common"), ProductController.findById);

module.exports = routes;