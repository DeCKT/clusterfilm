import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const imgBaseUrl = "https://image.tmdb.org/t/p/";

const backendHost = "http://localhost:5000";

class Clusters extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="clusters">
        <ul className="clusters-container">
          {this.props.userClusters.map((cluster) => {
            return (
              <li className="cluster-container" key={cluster._id}>
                <div className="cluster-info-container">
                  <ul className="cluster-info">
                    <li className="cluster-info-name">
                      <h2>{cluster.title}</h2>
                    </li>
                    <li className="cluster-info-creator">
                      by <a href="">{cluster.creator}</a>
                    </li>
                    <li>{cluster.films.length} films</li>
                  </ul>
                  <ul className="cluster-buttons">
                    <li>
                      <Link
                        to={`/cluster/${cluster._id}`}
                        className="action-button"
                      >
                        View
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/cluster/${cluster._id}/edit`}
                        className="action-button edit-button"
                        href=""
                      >
                        Edit
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="cluster-film-images">
                  <ul className="cluster-film-image-container">
                    {cluster.films.map((film) => {
                      return (
                        <li key={film.id} className="cluster-film-image">
                          <img src={imgBaseUrl + "w300" + film.poster} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Clusters;
