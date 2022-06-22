import React from "react";
import axios from "axios";

import moment from "moment";

const backendHost = "http://localhost:5000";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

class ComingSoon extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      shows: [],
    };
  }

  getMovies = async () => {
    return axios.get(`${backendHost}/movies/upcoming`).then((resp) => {
      return resp.data.results;
    });
  };

  getShows = async () => {
    return axios.get(`${backendHost}/tv/upcoming`).then((resp) => {
      return resp.data.results;
    });
  };

  async componentDidMount() {
    let movies = await this.getMovies();
    let shows = await this.getShows();

    console.log(movies);
    console.log(shows);

    this.setState({
      movies: movies,
      shows: shows,
    });
  }

  render() {
    return (
      <ul>
        {this.state.movies.map((movie) => {
          return (
            <li key={movie.id}>
              <div>
                <h3>{movie.title}</h3>
                <span>{moment(movie.release_date).format("MMMM Do YYYY")}</span>
              </div>
              <img src={imgBaseUrl + "w200" + movie.poster_path} />
            </li>
          );
        })}
        {this.state.shows.map((show) => {
          return (
            <li key={show.id}>
              <div>
                <h3>{show.name}</h3>
                <span>
                  {moment(show.first_air_date).format("MMMM Do YYYY")}
                </span>
              </div>
              <img src={imgBaseUrl + "w200" + show.poster_path} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ComingSoon;
