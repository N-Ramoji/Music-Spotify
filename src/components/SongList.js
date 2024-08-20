import React from 'react';
import './SongList.css';

const SongList = ({ onSelectSong, tab, songs }) => {
  // Filter or sort songs based on the active tab
  const displayedSongs = tab === 'top-tracks'
    ? songs.filter(song => song.top_track)
    : tab === 'for-you'
      ? songs.sort(() => Math.random() - 0.5)
      : songs;

  return (
    <div className="song-list">
      {displayedSongs.map((song, index) => (
        <div key={song.id} className="song-item" onClick={() => onSelectSong(song, index)}>
          <div className="song-image-container">
            <img className="song-image" src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
          </div>
          <div className="song-details">
            <div className="song-name">{song.name}</div>
            <div className="song-artist">{song.artist}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
