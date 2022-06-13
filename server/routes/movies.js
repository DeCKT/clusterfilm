const routes = require("express").Router();

const controller = require("../controllers/movies");

routes.get("/upcoming", controller.getUpcoming);

routes.get("/cast/:id", controller.getMovieActors);

module.exports = routes;
