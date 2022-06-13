const routes = require("express").Router();

const controller = require("../controllers/movies");

routes.get("/upcoming", controller.getUpcoming);

routes.get("/cast/:id", controller.getMovieActors);

routes.get("/genres", controller.getGenres);

module.exports = routes;
