import React from "react";
import axios from "axios";

let movies;

class ShowMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  async displayMovies() {
    await axios.get("http://localhost:5000/movies").then((resp) => {
      movies = resp.data.results.map((movie) => (
        <li key={movie.title}>{movie.title}</li>
      ));
    });
    this.setState({
      movies: movies,
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.displayMovies()}>Show Movies</button>
        <ul>{this.state.movies}</ul>
      </div>
    );
  }
}

export default ShowMovies;
