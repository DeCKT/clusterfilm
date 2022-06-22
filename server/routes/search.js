const routes = require("express").Router();

const controller = require("../controllers/search");

routes.get("/all", controller.searchAll);

module.exports = routes;
