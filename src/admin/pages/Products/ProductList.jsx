import React from 'react';
import './stylesheets/ProductList.css';

const ProductList = () => {
  const products = [
    {
      id: 1,
      image: '/path-to-product1.jpg',
      name: 'Product 1'
    },
    {
      id: 2,
      image: '/path-to-product2.jpg',
      name: 'Product 2'
    },
    {
      id: 3,
      image: '/path-to-product3.jpg',
      name: 'Product 3'
    }
  ];

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h4>{product.name}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
