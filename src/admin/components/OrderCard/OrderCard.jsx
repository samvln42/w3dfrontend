import React from 'react';
import './OrderCard.css';

const OrderCard = ({ title, count, color, icon }) => {
  return (
    <div className="order-card" style={{ backgroundColor: `${color}15` }}>
      <div className="card-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <div className="count">{count}</div>
        <a href="#" className="view-more">View More</a>
      </div>
    </div>
  );
};

export default OrderCard;
