import axios from "axios";
import React from "react";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "http://localhost:5000";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  async searchDB(query) {
    return axios
      .get(`${backendHost}/search/all?search=${query}`)
      .then((resp) => {
        this.setState(
          {
            results: resp.data.results,
          },
          console.log(this.state.results)
        );
        return resp.data.results;
      });
  }

  render() {
    return (
      <div id="search">
        <input
          placeholder="Search..."
          id="search-input"
          onChange={(e) => {
            this.searchDB(e.target.value);
          }}
        />
        <ul>
          {this.state.results.map((result) => {
            return (
              <li key={result.id}>
                {result.title || result.name}
                <img
                  src={
                    imgBaseUrl +
                    "w200" +
                    (result.poster_path || result.profile_path)
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Search;
