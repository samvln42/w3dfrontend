import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import pic from '../../../images/pic.png'
import './Stylesheets/ProductDetials.css';



const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    // TODO: Fetch product details from API
    setProduct({
      id: productId,
      name: 'cabbage',
      price: 12000,
      description: 'cc',
      rating: 5,
      colors: ['Red', 'Blue', 'Green', 'Black'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      image: pic
    });
  }, [productId]);


  useEffect(() => {
    // Set default selections when product loads
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', {
      productId,
      quantity,
      color: selectedColor,
      size: selectedSize
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    // TODO: Implement buy now functionality
    console.log('Buying now:', {
      productId,
      quantity,
      color: selectedColor,
      size: selectedSize
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="product-details-container">
        <div className="product-main">
          <div className="product-image">
            <img src={product.image} alt={product.name} />

          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="price">${product.price.toLocaleString()}</div>
            
            <div className="description">
              <p>{product.description}</p>
            </div>

            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index} 
                  className={`star ${index < product.rating ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="options">
              <div className="option-group">
                <label>Color:</label>
                <div className="option-buttons">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`option-btn ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>Size:</label>
                <div className="option-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`option-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="buy-now-btn"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        <div className="product-reviews">
          <h2>All Reviews</h2>
          <div className="reviews-content">
            <p className="no-reviews">No reviews available</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;