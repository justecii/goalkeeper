import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import Signout from "../components/Auth/Signout";

const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnAuth />
    )}
  </nav>
);

const NavbarUnAuth = () => (
  <ul>
    <li className="nav-link">
      <NavLink to="/" exact>
        Home
      </NavLink>
    </li>
    <li className="nav-link">
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li className="nav-link">
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li className="nav-link">
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li className="nav-link">
        <NavLink to="/goal/add">Add Goal</NavLink>
      </li>
      <li className="nav-link">
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li className="nav-link">
        <Signout />
      </li>
    </ul>
  </Fragment>
);

export default Navbar;
