const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const routes = Router();

routes.post("/auth/signin", AuthController.signin);
routes.post("/auth/signup", AuthController.signup);

module.exports = routes;