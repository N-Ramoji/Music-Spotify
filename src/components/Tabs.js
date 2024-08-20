import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, onTabClick }) => {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === 'for-you' ? 'active' : ''}`}
        onClick={() => onTabClick('for-you')}
      >
        For You
      </button>
      <button
        className={`tab-button ${activeTab === 'top-tracks' ? 'active' : ''}`}
        onClick={() => onTabClick('top-tracks')}
      >
        Top Tracks
      </button>
    </div>
  );
};

export default Tabs;
