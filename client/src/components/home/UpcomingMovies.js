import React from "react";
import axios from "axios";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "http://localhost:5000";

const getGenres = async () =>
  axios.get(`${backendHost}/movies/genres`).then((resp) => {
    return resp.data.genres;
  });

const addCluster = async (email, title, film) => {
  let newCluster = axios.post(`${backendHost}/cluster/new`, {
    email: email,
    title: title,
  });
  let clusterId = (await newCluster).data.insertedId;
  axios.put(`${backendHost}/cluster/${clusterId}/add/${film.id}`, film);
};

const addFilmToCluster = async (film, clusterId) => {
  console.log(`Film: `);
  console.log(film);
  console.log(`Cluster: ${clusterId}`);
  axios.put(`${backendHost}/cluster/${clusterId}/add/${film.id}`, film);
};

class UpcomingMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      activeIndex: 0,
      adderOpen: false,
    };
  }

  toggleAdder = () => {
    let adderContainer = document.querySelector("#cluster-adder-container");
    if (adderContainer.classList.contains("adder-open")) {
      adderContainer.classList.remove("adder-open");
      adderContainer.classList.add("adder-closed");
    } else if (adderContainer.classList.contains("adder-closed")) {
      adderContainer.classList.remove("adder-closed");
      adderContainer.classList.add("adder-open");
    }
  };

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

  openClusterAdder = () => {
    let modal = document.querySelector("#new-cluster-modal");
    modal.classList.remove("modal-closed");
    modal.classList.add("modal-open");
  };

  closeClusterAdder = () => {
    let modal = document.querySelector("#new-cluster-modal");
    modal.classList.add("modal-closed");
    modal.classList.remove("modal-open");
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
                <Link
                  to={`result/movie/${movie.id}`}
                  className="details-button action-button"
                >
                  Details
                </Link>

                <div className="add-to-container">
                  <button
                    className="add-to-button action-button"
                    onClick={() => {
                      this.toggleAdder();
                    }}
                  >
                    Add to Cluster
                  </button>
                  <div id="cluster-adder-container" className="adder-closed">
                    <ul>
                      {this.props.userClusters.map((cluster) => {
                        return (
                          <li
                            key={cluster.title}
                            onClick={() => {
                              addFilmToCluster(
                                {
                                  id: movie.id,
                                  poster: movie.poster_path,
                                  type: "movie",
                                  title: movie.title,
                                },
                                cluster._id
                              );
                              this.toggleAdder();
                            }}
                          >
                            {cluster.title}
                          </li>
                        );
                      })}
                      <li
                        onClick={() => {
                          this.openClusterAdder();
                        }}
                      >
                        New cluster
                      </li>
                    </ul>
                  </div>
                  <div id="new-cluster-modal" className="modal-closed">
                    <div>
                      Title: <input id="new-cluster-title" type="text" />
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          addCluster(
                            this.props.userEmail,
                            document.querySelector("#new-cluster-title").value,
                            {
                              id: movie.id,
                              poster: movie.poster_path,
                              type: "movie",
                              title: movie.title,
                            }
                          );
                          this.closeClusterAdder();
                          this.toggleAdder();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
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
