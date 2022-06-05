import React from "react";

import { NavLink } from "react-router-dom";

let isLoggedIn = false;

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="">Coming Soon</NavLink>
          </li>
          <li>
            <NavLink to="">Suggested</NavLink>
          </li>
          <li>
            <NavLink to="">My Clusters</NavLink>
          </li>
          <li>
            <NavLink to="">Following</NavLink>
          </li>
          <li>
            <NavLink to="">Search</NavLink>
          </li>
          <li>
            <NavLink to="">{isLoggedIn ? "Account" : "Login"}</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
