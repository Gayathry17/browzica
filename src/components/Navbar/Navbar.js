import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

import logo from '../../assets/images/svg/logo.svg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Navbar() {
    return (
        <div className="navbar">
            <div className="navimg-container">
               <img src={logo} alt="" className="browzica-logo"/>
            </div>
            
            <Link to="/profile">
               <AccountCircleIcon className="nav-icon" />
            </Link>
            
        </div>
    )
}

export default Navbar
