import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stylesheets/RegisterType.css';
import Header from '../Header/Header';

const RegisterType = () => {
    const [selectedType, setSelectedType] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        if (selectedType) {
            navigate(`/register${selectedType.toLowerCase()}`);
        }
    };

    return (
        <>
            <Header />
            <div className="register-type-container">
                <h1>Join the membership</h1>
                <p className="register-subtitle">Please sign up to use the service!</p>

                <div className="type-selection">
                    <label className="type-option">
                        <input
                            type="radio"
                            name="userType"
                            value="User"
                            checked={selectedType === 'User'}
                            onChange={(e) => setSelectedType(e.target.value)}
                        />
                        <div className="type-content">
                            <span className="type-icon">👥</span>
                            <span className="type-label">User</span>
                        </div>
                    </label>

                    <label className="type-option">
                        <input
                            type="radio"
                            name="userType"
                            value="Store"
                            checked={selectedType === 'Store'}
                            onChange={(e) => setSelectedType(e.target.value)}
                        />
                        <div className="type-content">
                            <span className="type-icon">🏪</span>
                            <span className="type-label">Store</span>
                        </div>
                    </label>
                </div>

                <button
                    className="next-button"
                    onClick={handleNext}
                    disabled={!selectedType}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default RegisterType;
