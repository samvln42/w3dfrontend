import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo11.jpg'

import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="user-profile">
                <span className="email">humascotl@gmail.com</span>
                <div className="avatar">👤</div>
            </div>
        </div>
    );
};

export default Header;
