import React from 'react';
import bg from '../../../images/bg.jpg';
import './stylesheets/ProductBanner.css';

const ProductBanner = () => {
  return (
    <div className="product-banner">
      <img 
        src={bg} 
        alt="Online Store Banner"
        className="banner-image"
      />
    </div>
  );
};

export default ProductBanner;
