import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import ProductBanner from './ProductBanner';
import ProductList from './ProductList';
import Mode3D from '../3DMode/Mode3D';
import './stylesheets/Products.css';

const Products = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="products-section">
          <h2 className="products-header">Product</h2>
          <div className="action-buttons">
            <button className="btn delete-point">Add Category</button>
            <button className="btn add-point" onClick={handleAddProduct}>Add Product</button>
          </div>
          <ProductBanner />
          <div className="action-buttons">
            <button className="btn delete-point">- Delete Point</button>
            <button className="btn add-point">+ Add Point</button>
          </div>
          <Mode3D />
          <div className="products-content">
            <h3 className="section-title">ALL Product</h3>
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
