import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './UserAccount.css';

const UserAccount = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement delete account API call
      console.log('Delete account');
    }
  };

  return (
    <>
      <Header />
      <div className="account-container">
        <div className="account-header">
          <div className="profile-section">
            <div className="profile-image">
              <img 
                src="/default-avatar.png" 
                alt="Profile" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="profile-info">
              <span className="email-label">Name:</span>
              <span className="email-value">{userEmail}</span>
            </div>
          </div>
        </div>

        <div className="account-menu">
          <button className="menu-item" onClick={handleLogout}>
            <span className="menu-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7Z" fill="currentColor"/>
                <path d="M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
              </svg>
            </span>
            <span className="menu-text">Log out</span>
          </button>

          <button className="menu-item delete" onClick={handleDeleteAccount}>
            <span className="menu-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
              </svg>
            </span>
            <span className="menu-text">Delete account</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
