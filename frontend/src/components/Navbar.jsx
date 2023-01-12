import React from "react";
import { Link } from "react-router-dom";
// use hook to import context
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const logoutFunction = () => {
    // remove token from session storage
  };
  const loginFunction = () => {

  };

  const checkLoginStatus = () => {
    // preventDefault
    return true;
  };

  const isLoggedIn = checkLoginStatus();




  return (
    <header>
      <div className="container">
        <img src={Logo} alt="Logo"></img>
        <Link to="/">
          <h1>Rate My Landlord</h1>
        </Link>
        <Link to="/">
          <h3>Home</h3>
        </Link>
        
        <button onClick={isLoggedIn ? logoutFunction : loginFunction}>
          {/* {isLoggedIn ? "Log Out" : "Log In"} */}
          <Link to="/login">Log In</Link>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
