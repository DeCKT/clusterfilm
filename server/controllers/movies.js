const dotenv = require("dotenv").config();
const axios = require("axios");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

const getMovies = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};

module.exports = {
  getMovies,
};
