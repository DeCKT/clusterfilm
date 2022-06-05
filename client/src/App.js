import React from "react";

import Navbar from "./components/navbar";
import ShowMovies from "./components/showMovies";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <ShowMovies />
      </div>
    );
  }
}

export default App;
