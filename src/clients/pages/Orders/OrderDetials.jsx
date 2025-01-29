import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Stylesheets/OrderDetials.css';


const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // TODO: Fetch order details from API
    setOrderDetails({
      id: orderId,
      date: '1/29/2025, 12:56:16 PM',
      status: 'Pending',
      items: [
        {
          id: 1,
          name: 'Product 1',
          color: 'Red',
          size: 'M',
          price: 100,
          quantity: 2,
          image: '/path/to/image.jpg'
        }
      ],
      shippingAddress: {
        contactNumber: '123-456-7890',
        province: 'Bangkok',
        district: 'Sathorn',
        shippingCompany: 'Kerry',
        branch: 'Silom',
        accountName: 'John Doe'
      },
      total: 200
    });
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="order-details-container">
        <div className="order-header">
          <h1>Order Details</h1>
          <div className="order-meta">
            <p>Order ID: {orderDetails.id}</p>
            <p>Date: {orderDetails.date}</p>
            <p className={`status status-${orderDetails.status.toLowerCase()}`}>
              Status: {orderDetails.status}
            </p>
          </div>
        </div>

        <div className="order-items">
          <h2>Items</h2>
          {orderDetails.items.map(item => (
            <div key={item.id} className="item-card">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <p>Name: {item.name}</p>
                <p>Color: {item.color}</p>
                <p>Size: {item.size}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="shipping-info">
          <h2>Shipping Information</h2>
          <div className="info-grid">
            <p>Contact: {orderDetails.shippingAddress.contactNumber}</p>
            <p>Province: {orderDetails.shippingAddress.province}</p>
            <p>District: {orderDetails.shippingAddress.district}</p>
            <p>Shipping Company: {orderDetails.shippingAddress.shippingCompany}</p>
            <p>Branch: {orderDetails.shippingAddress.branch}</p>
            <p>Account Name: {orderDetails.shippingAddress.accountName}</p>
          </div>
        </div>

        <div className="order-summary">
          <div className="total">
            <span>Total Amount:</span>
            <span>${orderDetails.total}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
