import React from "react";

import { NavLink } from "react-router-dom";

import Search from "./search/Search";

let isLoggedIn = false;

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchOpen: false,
    };
  }

  toggleSearch() {
    return this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  render() {
    return (
      <nav>
        <ul className="navbar-container">
          <li className="navbar-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/coming-soon">Coming Soon</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/suggested">Suggested</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/my-clusters">My Clusters</NavLink>
          </li>
          <li className="navbar-item right-align">
            <div
              className="search-button"
              onClick={() => {
                this.toggleSearch();
              }}
            >
              {this.state.searchOpen ? "Close" : "Search"}
            </div>
          </li>
          <li className="navbar-item">
            <NavLink to="/profile">{isLoggedIn ? "Account" : "Login"}</NavLink>
          </li>
        </ul>
        {this.state.searchOpen ? <Search /> : null}
      </nav>
    );
  }
}

export default NavBar;
