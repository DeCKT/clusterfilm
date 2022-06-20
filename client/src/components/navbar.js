import React from "react";

import { NavLink } from "react-router-dom";

let isLoggedIn = false;

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/coming-soon">Coming Soon</NavLink>
          </li>
          <li>
            <NavLink to="/suggested">Suggested</NavLink>
          </li>
          <li>
            <NavLink to="/my-clusters">My Clusters</NavLink>
          </li>
          <li className="right-align">
            <NavLink to="">Search</NavLink>
          </li>
          <li>
            <NavLink to="/profile">{isLoggedIn ? "Account" : "Login"}</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
