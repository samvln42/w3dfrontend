import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import OrderCard from '../OrderCard/OrderCard';
import './Dashboard.css';

const Dashboard = () => {
  const orderStats = [
    { title: 'Pending', count: 0, color: '#B985F4', icon: '📝' },
    { title: 'Process', count: 0, color: '#4CAF50', icon: '🔄' },
    { title: 'Shipped', count: 0, color: '#7B8794', icon: '📦' },
    { title: 'Delivered', count: 0, color: '#FF9966', icon: '✅' },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="orders-section">
          <h2>Orders</h2>
          <div className="order-cards">
            {orderStats.map((stat, index) => (
              <OrderCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
