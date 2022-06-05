const routes = require("express").Router();

const controller = require("../controllers/movies");

routes.get("/", controller.getMovies);

module.exports = routes;
