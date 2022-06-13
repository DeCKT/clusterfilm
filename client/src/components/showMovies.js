import React from "react";
import axios from "axios";

const imgBaseUrl = "https://image.tmdb.org/t/p/";
const imgSize = "w200";

const backendHost = "http://localhost:5000";

const getGenres = async () =>
  axios.get(`${backendHost}/movies/genres`).then((resp) => {
    return resp.data.genres;
  });

class ShowMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      upcoming: [],
    };
  }

  async getActors(movieId) {
    let actors = [];
    await axios.get(`${backendHost}/movies/cast/${movieId}`).then((resp) => {
      for (let i = 0; i < 4; i++) {
        actors[i] = resp.data.cast[i];
      }
    });
    console.log(actors);
  }

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

    let thing = reducedMovies.map((movie) => {
      return movie.genres.map((genre) => {
        return genresArray.find((item) => {
          return item.id === genre;
        });
      });
    });

    console.log(thing);

    let reduced = [];

    for (let i = 0; i < 5; i++) {
      reduced[i] = { ...reducedMovies[i], ...reducedActors[i] };
    }

    let upcomingMovies = reduced.map((movie) => {
      return (
        <li key={movie.id}>
          <img src={imgBaseUrl + imgSize + movie.poster_path} />
          {movie.title}
          <ul>
            {movie.actors.map((actor) => {
              return (
                <li key={actor.id}>
                  <img src={imgBaseUrl + imgSize + actor.profile_path} />
                  {actor.name}
                </li>
              );
            })}
          </ul>
          <p>{movie.overview}</p>
          <ul>
            {/* {movie.genres.map((genre) => {
              return <li key={genre.name}>{genre.name}</li>;
            })} */}
          </ul>
        </li>
      );
    });

    this.setState({
      upcoming: upcomingMovies,
    });
  }

  render() {
    return (
      <div>
        <ul>{this.state.upcoming}</ul>
      </div>
    );
  }
}

export default ShowMovies;
