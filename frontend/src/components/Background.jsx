import React from 'react';
import "./Background.css";

const Background = () => {
  return (
    <div className="bg-container">
      <div className="star-layer layer-1"></div>
      <div className="star-layer layer-2"></div>
      <div className="star-layer layer-3"></div>
      <div className="star-layer layer-4"></div>
      <div className="nebula-glow"></div>
    </div>
  );
};

export default Background;