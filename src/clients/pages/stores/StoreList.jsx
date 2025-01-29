import React, { useRef, useState, useEffect } from 'react';
import './StoreList.css';
import axios from 'axios';

const StoreList = ({ handleStocked, setStocked, setStoreId }) => {

  const [stores, setStores] = useState([]);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,

      url: import.meta.env.VITE_API + "/store/stores/",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get stocked
  const handleGetStocked = (id) => {
    setStoreId(id);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(import.meta.env.VITE_API + `/store/${id}/stocked`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setStocked(result);
        if (result && result.length > 0) {
          handleStocked(result[0].id);
        }
      })
      .catch((error) => console.error(error));
  }

  // ตรวจสอบว่าควรแสดงลูกศรหรือไม่
  const checkArrows = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // แสดงลูกศรซ้ายเมื่อเลื่อนออกจากจุดเริ่มต้น
      setShowLeftArrow(container.scrollLeft > 0);

      // แสดงลูกศรขวาเมื่อยังเลื่อนไม่สุด
      setShowRightArrow(
        container.scrollWidth > container.clientWidth &&
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  // เพิ่ม event listener สำหรับการ scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkArrows(); // เช็คตอนโหลดครั้งแรก
      container.addEventListener('scroll', checkArrows);
      return () => container.removeEventListener('scroll', checkArrows);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const container = scrollContainerRef.current;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // * 2 เพื่อให้เลื่อนเร็วขึ้น
    container.scrollLeft = scrollLeft - walk;
  };


  return (
    <div className={`store-list-container ${showLeftArrow ? 'show-left' : ''} ${showRightArrow ? 'show-right' : ''}`}>
      <div
        className="store-list"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <span className="store-label">Stores</span>
        {stores.map(store => (
          <button
            key={store.id}
            className="store-button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleGetStocked(store.id)}
          >
            {store.name}
          </button>

        ))}
      </div>
    </div>
  );
};

export default StoreList;
