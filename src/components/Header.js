import React from 'react';
import './Header.css';
import songImage from './images/spotify.png'; // Adjust the path based on your structure

const MusicPlayer = () => {
  return (
    <div className="logo">
        <div className="logo-container">
            <img src={songImage} alt="Song Cover" className="top-left-image" />
        </div>
        <div className="spotify-name">Spotify</div>
        <div className="account-symbol">
          <i className="fa fa-user" aria-hidden="true"></i>
        </div>
    </div>
  );
};

export default MusicPlayer;
