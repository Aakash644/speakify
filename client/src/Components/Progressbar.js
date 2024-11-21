// ProgressBar.js
import React from 'react';
import './Progressbar.css'; // Create a CSS file for progress bar styles if needed.

const Progressbar = ({ progress }) => {
  return (
    <div className="progress-container" style={{ width: '100%'}}>
      <div
        className="progress-bar"
        style={{
          height: '5px',
          backgroundColor: 'green',
          width: `${progress}%`,
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
    </div>
  );
};

export default Progressbar;
