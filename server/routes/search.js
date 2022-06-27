const routes = require("express").Router();

const controller = require("../controllers/search");

routes.get("/all", controller.searchAll);

routes.get("/movie/:id", controller.searchMovieById);

routes.get("/tv/:id", controller.searchShowById);

routes.get("/person/:id", controller.searchPersonById);

module.exports = routes;
