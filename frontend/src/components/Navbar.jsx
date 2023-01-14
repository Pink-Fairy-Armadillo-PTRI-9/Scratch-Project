import React from 'react';
import { Link } from 'react-router-dom';
// use hook to import context
import Logo from '../assets/Logo.png';

const Navbar = ({ isLoggedIn }) => {

  const authBtnProps = {
    text: isLoggedIn ? 'Log Out' : 'Log In',
    route: isLoggedIn ? '/logout' : '/login'
  };

  return (
    <header>
      <div className="bg-secondary">
        <div className="max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center sm:space-x-10 space-x-2">
              <img className="h-12" src={Logo} alt="Logo"></img>
              <Link to="/">
                <h1 className="text-gray-600 py-2 hover:text-dark-purple font-semibold">
                  Rate My Landlord
                </h1>
              </Link>
            </div>
            <div className="flex items-center sm:space-x-10 space-x-2">
              <Link to="/">
                <h3 className="text-gray-600 py-2 hover:text-dark-purple font-semibold">
                  Home
                </h3>
              </Link>
              <Link to={`${authBtnProps.route}`} className="text-gray-600  hover:text-dark-purple font-semibold ">
                <button type='button' className=" bg-primary p-2 rounded sm:text-1xl">{`${authBtnProps.text}`}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
