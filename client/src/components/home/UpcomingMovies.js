import React from "react";
import axios from "axios";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "http://localhost:5000";

const getGenres = async () =>
  axios.get(`${backendHost}/movies/genres`).then((resp) => {
    return resp.data.genres;
  });

class UpcomingMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      upcoming: [],
      activeIndex: 0,
    };
  }

  cycleNext = () => {
    if (this.state.activeIndex === this.state.upcoming.length - 1) {
      this.setState({
        activeIndex: 0,
      });
    } else {
      this.setState({
        activeIndex: this.state.activeIndex + 1,
      });
    }
  };

  cyclePrev = () => {
    if (this.state.activeIndex === 0) {
      this.setState({
        activeIndex: this.state.upcoming.length - 1,
      });
    } else {
      this.setState({
        activeIndex: this.state.activeIndex - 1,
      });
    }
  };

  async componentDidMount() {
    let newMovies = await axios
      .get(`${backendHost}/movies/upcoming`)
      .then((resp) => {
        return resp.data.results;
      });
    let reducedMovies = newMovies.slice(0, 5).map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        genres: movie.genre_ids,
      };
    });

    // let genresParsed = reducedMovies.forEach((movie) => {
    //   movie.genres.map((genre) => {
    //     return genresArray.find((ele) => ele.id === genre.id).name;
    //   });
    // });

    // for (let i = 0; i < 5; i++) {
    //   reducedMovies[i].genres = genresParsed[i];
    // }

    // console.log(newMovies);

    let movieCasts = await Promise.all(
      reducedMovies.map((movie) => {
        return axios
          .get(`${backendHost}/movies/cast/${movie.id}`)
          .then((resp) => {
            return resp.data.cast;
          });
      })
    );

    let reducedActors = movieCasts.map((cast) => {
      return {
        actors: cast.slice(0, 4).map((actor) => {
          return {
            name: actor.name,
            profile_path: actor.profile_path,
            id: actor.id,
          };
        }),
      };
    });

    let genresArray = await getGenres();

    let reducedGenres = reducedMovies.map((movie) => {
      return {
        genres: movie.genres.map((genre) => {
          return genresArray.find((item) => {
            return item.id === genre;
          });
        }),
      };
    });

    let reduced = [];

    for (let i = 0; i < 5; i++) {
      reduced[i] = {
        ...reducedMovies[i],
        ...reducedActors[i],
        ...reducedGenres[i],
      };
    }

    let upcomingMovies = reduced.map((movie) => {
      return (
        <li className="upcoming-container" key={movie.id}>
          <div className="upcoming-img-container">
            <img
              className="upcoming-img"
              src={imgBaseUrl + "w300" + movie.poster_path}
            />
          </div>
          <div className="upcoming-info-container">
            <div className="upcoming-info">
              <h1>{movie.title}</h1>
              <ul className="genres-container">
                {movie.genres.map((genre) => {
                  return (
                    <li className="genre-name" key={genre.id}>
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
              <ul className="actors-container">
                {movie.actors.map((actor) => {
                  return (
                    <li className="actor-container" key={actor.id}>
                      <div className="actor-img-container">
                        <img
                          className="actor-img"
                          src={imgBaseUrl + "w200" + actor.profile_path}
                        />
                      </div>
                      <span>{actor.name}</span>
                    </li>
                  );
                })}
              </ul>
              <p>{movie.overview}</p>
              <div className="action-button-container">
                <button className="details-button action-button">
                  Details
                </button>
                <button className="add-to-button action-button">
                  Add to Cluster
                </button>
              </div>
            </div>
          </div>
        </li>
      );
    });

    this.setState({
      upcoming: upcomingMovies,
    });
  }

  render() {
    return (
      <div id="upcoming">
        <ul>{this.state.upcoming[this.state.activeIndex]}</ul>
        <div className="cycle-button-container">
          <button onClick={this.cyclePrev}>
            <IoIosArrowBack />
          </button>
          <button onClick={this.cycleNext}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  }
}

export default UpcomingMovies;
