import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Stylesheets/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: Fetch orders from API
    setOrders([
      {
        id: 1,
        date: '1/29/2025, 12:56:16 PM',
        status: 'Pending',
        total: 150
      },
      {
        id: 2,
        date: '1/29/2025, 12:56:16 PM',
        status: 'Pending',
        total: 300
      },
      {
        id: 3,
        date: '1/29/2025, 12:56:16 PM',
        status: 'Pending',
        total: 450
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <>
      <Header />
      <div className="orders-container">
        <h1>Order</h1>
        
        <div className="orders-list">
          {orders.map(order => (
            <Link 
              to={`/orders/${order.id}`} 
              key={order.id}
              className="order-card"
            >
              <div className="order-info">
                <div>
                  <p className="order-id">ID: {order.id}</p>
                  <p className="order-date">Date Time: {order.date}</p>
                </div>
                <span className={`order-status ${getStatusColor(order.status)}`}>
                  Status: {order.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
