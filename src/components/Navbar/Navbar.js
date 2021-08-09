import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

import logoNoText from '../../assets/images/svg/logo-notext.svg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Navbar() {
    return (
        <div className="navbar">
            <div className="navimg-container">
               <img src={logoNoText} alt="" className="browzica-logo"/>
            </div>
            
            <Link to="/profile">
               <AccountCircleIcon className="nav-icon" />
            </Link>
            
        </div>
    )
}

export default Navbar
