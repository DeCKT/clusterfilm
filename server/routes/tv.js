const routes = require("express").Router();

const controller = require("../controllers/tv");

routes.get("/upcoming", controller.getUpcoming);

module.exports = routes;
