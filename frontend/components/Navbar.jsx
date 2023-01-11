import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../frontend2/src/assets/Logo.png'

const Navbar = () => {
    return (
        <header>
            <div className="container">
            <img src={Logo} alt="Logo"></img>
            <Link to="/">
                <h1>Armadillo</h1>
            </Link>
            <Link to="/">
                <h3>Home</h3>
            </Link>
            </div>
        </header>
    )
}

export default Navbar