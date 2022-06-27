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

const searchMovieById = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/movie/${req.params.id}?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};

const searchShowById = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/tv/${req.params.id}?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};

const searchPersonById = async (req, res) => {
  res.send(
    await axios
      .get(`${baseUrl}/person/${req.params.id}?api_key=${apiKey}`)
      .then((resp) => {
        return resp.data;
      })
  );
};
module.exports = {
  searchAll,
  searchMovieById,
  searchShowById,
  searchPersonById,
};
