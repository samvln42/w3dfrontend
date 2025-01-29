import React from 'react';
import bg from '../../../images/bg.jpg'
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <button className="banner-arrow left">❮</button>
      <button className="banner-arrow right">❯</button>
      <img
        src={bg}
        alt="Banner"
        className="banner-image"
      />
      {/* <button className="mode-3d-button">
        OPEN 3D MODE
      </button> */}
    </div>
  );
};

export default Banner;
