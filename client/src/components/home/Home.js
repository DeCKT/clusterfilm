import React from "react";
import Clusters from "./Clusters";
import Trending from "./Trending";
import UpcomingMovies from "./UpcomingMovies";

class Home extends React.Component {
  render() {
    return (
      <>
        <UpcomingMovies
          userEmail={this.props.userEmail}
          userClusters={this.props.userClusters}
        />
        <Trending />
        <Clusters
          userEmail={this.props.userEmail}
          userClusters={this.props.userClusters}
        />
      </>
    );
  }
}

export default Home;
