import React from "react";

class ShowMovies extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          console.log("Moovies :)");
        }}
      >
        Show Movies
      </button>
    );
  }
}

export default ShowMovies;
