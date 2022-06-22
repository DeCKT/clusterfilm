const dotenv = require("dotenv").config();
const axios = require("axios");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

const searchAll = async (req, res) => {
  if (req.query.search.length > 0) {
    res.send(
      await axios
        .get(
          `${baseUrl}/search/multi?api_key=${apiKey}&query=${req.query.search}`
        )
        .then((resp) => {
          return resp.data;
        })
    );
  }
};

module.exports = {
  searchAll,
};
