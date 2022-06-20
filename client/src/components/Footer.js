import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        data provided by{" "}
        <a target="_blank" href="https://www.themoviedb.org/">
          <img className="footer-db-img" src="/tmdb-icon.svg" />
        </a>
      </div>
    );
  }
}

export default Footer;
