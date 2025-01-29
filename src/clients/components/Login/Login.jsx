import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch(`${import.meta.env.VITE_API}/user/signin`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // บันทึกข้อมูลลง localStorage
        localStorage.setItem('token', data.token.access); // เก็บ access token
        localStorage.setItem('refresh_token', data.token.refresh); // เก็บ refresh token
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('is_admin', data.is_admin);
        localStorage.setItem('store_id', data.store_id || '');
        localStorage.setItem('user_name', data.user_name || '');
        localStorage.setItem('store_name', data.origin_store_name || '');
        localStorage.setItem('email', data.email);
            
        // Redirect ไปหน้าหลัก
        navigate("/");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
      });
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h1>Login</h1>
        <p className="login-subtitle">Please Log in to use the service!</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="forgot-password">
              <span>Forgot your password?</span>
              <Link to="/forgot-password" className="find-password-link">Find password</Link>
            </div>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="signup-prompt">
            <span>Is this your first time?</span>
            <Link to="/register" className="signup-link">Join the membership</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

