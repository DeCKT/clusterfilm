const dotenv = require("dotenv").config();
const axios = require("axios");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

const getFirst = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/trending/tv/day?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};

module.exports = {
  getFirst,
};
