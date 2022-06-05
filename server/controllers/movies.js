const dotenv = require("dotenv").config();
const axios = require("axios");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

const getMovies = async () => {
  axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`).then((res) => {
    console.log(res.data);
  });
};

module.exports = {
  getMovies,
};
