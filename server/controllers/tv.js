const dotenv = require("dotenv").config();
const axios = require("axios");

const moment = require("moment");

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_KEY;

const getUpcoming = async (req, res) => {
  res.send(
    await axios
      .get(
        `${baseUrl}/discover/tv?api_key=${apiKey}&language=en-US&sort_by=first_air_date.asc&first_air_date.gte=${moment().format(
          "YYYY-MM-DD"
        )}`
      )
      .then((resp) => {
        return resp.data;
      })
  );
};

module.exports = {
  getUpcoming,
};
