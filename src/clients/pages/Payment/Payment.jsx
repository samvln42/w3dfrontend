import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Payment.css';

const Payment = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({
        items: [],
        totalPrice: 0
    });

    const [shippingAddress, setShippingAddress] = useState({
        contactNumber: '',
        province: '',
        district: '',
        subDistrict: '',
        branch: '',
        accountName: ''
    });

    useEffect(() => {
        // TODO: Fetch order details from API or cart state
        setOrderDetails({
            items: [{
                id: 1,
                name: '111',
                color: 'e',
                size: 'e',
                price: 4,
                quantity: 1,
                image: '/path/to/image.jpg'
            },
            {
                id: 2,
                name: '222',
                color: 'e',
                size: 'e',
                price: 4,
                quantity: 1,
                image: '/path/to/image.jpg'
            }
            ],
            totalPrice: 8

        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement payment submission
        console.log('Shipping Address:', shippingAddress);
        console.log('Order Details:', orderDetails);
    };

    const handleCopyClick = () => {
        // TODO: Copy account number to clipboard
        navigator.clipboard.writeText("XXXX-XXXX-XXXX");
    };

    return (
        <>
            <Header />
            <div className="payment-container">
                <h1>Payment</h1>

                <section className="order-details">
                    <h2>Details:</h2>
                    {orderDetails.items.map(item => (
                        <div key={item.id} className="order-item">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <p>Name: {item.name}</p>
                                <p>Color: {item.color}</p>
                                <p>Size: {item.size}</p>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="shipping-address">
                    <h2>Address:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="contactNumber"
                                placeholder="Contact number"
                                value={shippingAddress.contactNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="province"
                                placeholder="Province"
                                value={shippingAddress.province}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="district"
                                placeholder="District"
                                value={shippingAddress.district}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="subDistrict"
                                placeholder="Shipping Company name"
                                value={shippingAddress.subDistrict}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="branch"
                                placeholder="Branch"
                                value={shippingAddress.branch}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="accountName"
                                placeholder="Your account name here"
                                value={shippingAddress.accountName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="total-price">
                            <p>Total Price: ${orderDetails.totalPrice}</p>
                        </div>

                        <div className="bank-details">
                            <p>Please transfer money to this account</p>
                            <div className="account-number">
                                <span>XXXX-XXXX-XXXX</span>
                                <button onClick={handleCopyClick} className="copy-button">
                                    <span className="copy-icon">📋</span>
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="confirm-button">
                            Confirm
                        </button>
                    </form>
                </section>
            </div>
        </>
    );
};

export default Payment;
