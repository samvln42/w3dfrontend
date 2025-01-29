import React, { useState } from 'react';
import Header from '../Header/Header';
import './Stylesheets/Register.css';

const StoreRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        certificationNumber: '',
        storeName: '',
        businessNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVerify = () => {
        // TODO: Implement email verification logic
        console.log('Verifying email...');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement registration logic
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <Header />
            <div className="register-container">
                <h1>Store registration</h1>
                <p className="register-subtitle">You are in the process of signing up as a store!</p>

                <form onSubmit={handleSubmit} className="register-form">
                    <h2>Enter store information</h2>

                    <div className="form-group">
                        <div className="input-with-button">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="verify-button"
                                onClick={handleVerify}
                            >
                                Verify
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="certificationNumber"
                            placeholder="Certification Number"
                            value={formData.certificationNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="storeName"
                            placeholder="Store Name"
                            value={formData.storeName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="businessNumber"
                            placeholder="Business Registration Number"
                            value={formData.businessNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};

export default StoreRegister;
