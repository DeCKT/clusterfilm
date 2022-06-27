import axios from "axios";
import React from "react";

import { Link } from "react-router-dom";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "http://localhost:5000";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  async searchDB(query) {
    return axios
      .get(`${backendHost}/search/all?search=${query}`)
      .then((resp) => {
        this.setState({
          results: resp.data.results,
        });
        return resp.data.results;
      });
  }

  render() {
    return (
      <div id="search">
        <div className="search-input-container">
          <input
            placeholder="Search..."
            className="search-input"
            onChange={(e) => {
              this.searchDB(e.target.value);
            }}
          />
        </div>

        <ul className="search-results">
          {this.state.results.map((result) => {
            return (
              <li className="search-result" key={result.id}>
                <Link to={"/result/" + result.media_type + "/" + result.id}>
                  <img
                    className="search-result-image"
                    src={
                      imgBaseUrl +
                      "w200" +
                      (result.poster_path || result.profile_path)
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.src = "/no-img.svg";
                    }}
                  />
                  {result.title || result.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Search;
