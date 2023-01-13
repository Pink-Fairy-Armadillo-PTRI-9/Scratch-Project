import React from 'react';
import { Link } from 'react-router-dom';
// use hook to import context
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const logoutFunction = () => {
    // remove token from session storage
  };
  const loginFunction = () => {};

  const checkLoginStatus = () => {
    // preventDefault
    return true;
  };

  const isLoggedIn = checkLoginStatus();

  return (
    <header>
      <div className="bg-secondary">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center sm:space-x-10 space-x-10">
              <img className="h-12" src={Logo} alt="Logo"></img>
              <Link to="/">
                <h1>Rate My Landlord</h1>
              </Link>
            </div>
            <div className="flex items-center sm:space-x-10 space-x-2">
              <Link to="/">
                <h3>Home</h3>
              </Link>

              <button
                onClick={isLoggedIn ? logoutFunction : loginFunction}
                className="dark:bg-white bg-primary p-2 rounded sm:text-1xl"
              >
                {/* {isLoggedIn ? "Log Out" : "Log In"} */}
                <Link to="/login">Log In</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
