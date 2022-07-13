import React from "react";

import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <Link
          style={{ color: "#fff" }}
          to="https://github.com/DeCKT/clusterfilm"
        >
          GitHub Repo
        </Link>
        <div>Developed by Daniel Eckton - 2022</div>
        <div className="data-provider">
          <span>Data provided by </span>
          <a target="_blank" href="https://www.themoviedb.org/">
            <img className="footer-db-img" src="/tmdb-icon.svg" />
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
