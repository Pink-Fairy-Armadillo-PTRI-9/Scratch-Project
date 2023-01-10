import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Janus.png'

const Navbar = () => {
    return (
        <header>
            <div className="container">
            <img src={Logo} alt="Logo"></img>
            <Link to="/">
                <h1>Time-Tracking Todo List</h1>
            </Link>
            <Link to="/">
                <h3>Home</h3>
            </Link>
            <Link to="/report">
                <h3>Time-Report</h3>
            </Link>
            </div>
        </header>
    )
}

export default Navbar