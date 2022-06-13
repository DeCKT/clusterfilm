const dotenv = require("dotenv").config();
const axios = require("axios");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

const getUpcoming = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};

const getMovieActors = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/movie/${req.params.id}/credits?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};

const getGenres = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};

module.exports = {
  getUpcoming,
  getMovieActors,
  getGenres,
};
