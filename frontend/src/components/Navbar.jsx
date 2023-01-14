import React, { useState } from "react";
import { Link } from "react-router-dom";
// use hook to import context
import Logo from "../assets/Logo.png";

const Navbar = ({isLoggedIn}) => {
  console.log('Navbar.jsx, isLoggedIn: ', isLoggedIn);
  // const [authBtnProps, setAuthBtnProps] = useState({ text: '', route: ''});

  // const toggleAuthBtn = (isLoggedIn) => {
  //   setAuthBtnProps ({
  //       text: isLoggedIn ? 'Log Out' : 'Log In',
  //       route: isLoggedIn ? '/logout' : '/login'
  //   });
  // };

  // toggleAuthBtn(isLoggedIn);

  const authBtnProps = {
    text: isLoggedIn ? 'Log Out' : 'Log In',
    route: isLoggedIn ? '/logout' : '/login'
  };

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
        {/* TO-DO: if logged in, display username */}
        <Link to={`${authBtnProps.route}`}>
          <button type='button'>{`${authBtnProps.text}`}</button>
        </Link>    
      </div>
    </header>
  );
};

export default Navbar;
