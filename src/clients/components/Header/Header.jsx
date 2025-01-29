import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import logo from '../../../images/logo11.jpg'
import './Header.css';

const Header = () => {

    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('is_admin');
    const isStore = localStorage.getItem('store_id');

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('store_id');
        navigate('/');
    }

    return (
        <header className="header client-page">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>

            <div className="header-container">
                <nav className="nav-links">
                    <Link to="/" className="nav-link home-link">Home</Link>
                    <Link to="/orders" className="nav-link">Orders</Link>
                </nav>

                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                </div>

                <div className="user-actions">
                    <Link to="/cart" className="icon-button"><MdOutlineShoppingCartCheckout /></Link>
                    {token ? (
                        <>
                            <Link to="/useraccount" className="icon-button"><FaRegUser /></Link>
                            {isAdmin != false &&
                                <Link to="/admin/dashboard" className="icon-button"><MdOutlineDashboard /></Link>
                            }
                            {isStore != "" && isAdmin == false &&
                                <Link to="/store/dashboard" className="icon-button"><MdOutlineDashboard /></Link>
                            }
                        </>
                    ) : (
                        <Link to="/login" className="icon-button"><BiLogIn /></Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
