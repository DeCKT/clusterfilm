import React from "react";
import Clusters from "./Clusters";
import Trending from "./Trending";
import UpcomingMovies from "./UpcomingMovies";

class Home extends React.Component {
  render() {
    return (
      <>
        <UpcomingMovies />
        <Trending />
        <Clusters />
      </>
    );
  }
}

export default Home;
