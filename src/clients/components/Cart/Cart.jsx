import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch cart items from API
    // ตัวอย่างข้อมูล
    setCartItems({
      'taca': {
        items: [{
          id: 1,
          name: 'll',
          color: '0',
          size: '0',
          price: 7,
          quantity: 1,
          image: '/path/to/image1.jpg'
        }],
        total: 7
      },
      'humascotl': {
        items: [{
          id: 2,
          name: '111',
          color: 'e',
          size: 'e',
          price: 4,
          quantity: 1,
          image: '/path/to/image2.jpg'
        }],
        total: 4
      }
    });
  }, []);

  const handleQuantityChange = (storeId, itemId, change) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [storeId]: {
        ...prevItems[storeId],
        items: prevItems[storeId].items.map(item => {
          if (item.id === itemId) {
            const newQuantity = Math.max(1, item.quantity + change);
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
        total: prevItems[storeId].items.reduce((sum, item) => {
          const quantity = item.id === itemId ? 
            Math.max(1, item.quantity + change) : item.quantity;
          return sum + (item.price * quantity);
        }, 0)
      }
    }));
  };

  const handleRemoveItem = (storeId, itemId) => {
    setCartItems(prevItems => {
      const updatedStore = {
        items: prevItems[storeId].items.filter(item => item.id !== itemId),
      };
      
      updatedStore.total = updatedStore.items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 
        0
      );

      // ถ้าไม่มีสินค้าในร้านแล้ว ให้ลบร้านออก
      if (updatedStore.items.length === 0) {
        const { [storeId]: _, ...rest } = prevItems;
        return rest;
      }

      return {
        ...prevItems,
        [storeId]: updatedStore
      };
    });
  };

  const handleCheckout = (storeId) => {
    // TODO: Implement checkout logic
    console.log(`Checkout from store: ${storeId}`);
    navigate(`/payment/${storeId}`);
  };


  return (
    <>
      <Header />
      <div className="cart-container">
        {Object.entries(cartItems).map(([storeName, storeData]) => (
          <div key={storeName} className="store-section">
            <h2>{storeName}</h2>
            
            <div className="cart-items">
              {storeData.items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-info">
                      <p className="item-name">name: {item.name}</p>
                      <p className="item-color">color: {item.color}</p>
                      <p className="item-size">size: {item.size}</p>
                      <p className="item-price">price: ${item.price}</p>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(storeName, item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(storeName, item.id, 1)}>+</button>
                      </div>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveItem(storeName, item.id)}
                      >
                        <span className="remove-icon">🗑</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Quantity:</span>
                <span>{storeData.items.length} Items</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${storeData.total.toFixed(2)}</span>
              </div>
              <button 
                className="checkout-button"
                onClick={() => handleCheckout(storeData.items[0].id)}
              >
                Checkout
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
