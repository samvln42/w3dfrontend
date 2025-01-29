import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: '⚡', text: 'Dashboard', path: '/admin/dashboard' },
    { icon: '📦', text: 'Products', path: '/admin/products' },
    { icon: '🏪', text: 'Stores', path: '/admin/stores' },
    { icon: '👥', text: 'Users', path: '/admin/users' },
    { icon: '👨‍💼', text: 'Admins', path: '/admin/admins' },
    { icon: '🏦', text: 'Bank', path: '/admin/bank' },
  ];

  return (
    <div className="sidebar">
      <nav className="menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.text}</span>
          </Link>
        ))}
      </nav>
      <Link to="/logout" className="logout menu-item">
        <span className="icon">🚪</span>
        <span className="text">Log Out</span>
      </Link>
    </div>
  );
};

export default Sidebar;
