import React from "react";
import { Link } from "react-router-dom";
// use hook to import context
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const logoutFunction = () => {};
  const loginFunction = () => {};

  const checkLoginStatus = () => {
    // preventDefault
    return true;
  };

  const isLoggedIn = checkLoginStatus();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Rate My Landlord</h1>
        </Link>
        <Link to="/">
          <h3>Home</h3>
        </Link>
        <button onClick={isLoggedIn ? logoutFunction : loginFunction}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;