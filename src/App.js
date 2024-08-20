import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import SongList from './components/SongList';
import MusicPlayer from './components/MusicPlayer';

// Hook to check if the screen size is less than 850px
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, [query]);

  return matches;
};

const App = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width: 850px)');

  useEffect(() => {
    fetch('https://cms.samespace.com/items/songs')
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.data);
        setFilteredSongs(data.data);
        if (data.data.length > 0) {
          setSelectedSong(data.data[0]);
          setCurrentIndex(0);
        }
      });
  }, []);

  useEffect(() => {
    if (filteredSongs.length > 0 && !selectedSong) {
      setSelectedSong(filteredSongs[0]);
      setCurrentIndex(0);
    }
  }, [filteredSongs,selectedSong]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectSong = (song, index) => {
    setSelectedSong(song);
    setCurrentIndex(index);
  };

  const handleSearch = (searchQuery) => {
    const query = searchQuery.toLowerCase();
    const filtered = songs.filter(song =>
      song.name.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
    setFilteredSongs(filtered);
  };

  const handleNext = () => {
    if (currentIndex < filteredSongs.length - 1) {
      const nextIndex = currentIndex + 1;
      setSelectedSong(filteredSongs[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setSelectedSong(filteredSongs[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className={`page-container ${isSmallScreen ? 'small-screen' : ''}`}>
      {isSmallScreen && (
        <>
          <button className="menu-button" onClick={toggleMenu}>
            Menu
          </button>
          <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <SongList
              onSelectSong={handleSelectSong}
              tab={activeTab}
              songs={filteredSongs}
            />
          </div>
        </>
      )}
      <div className={`left-container ${isSmallScreen ? 'hidden' : ''}`}>
        <Header />
      </div>
      <div className={`content-container ${isSmallScreen ? 'hidden' : ''}`}>
        <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
        <SearchBar onSearch={handleSearch} />
        <SongList
          onSelectSong={handleSelectSong}
          tab={activeTab}
          songs={filteredSongs}
        />
      </div>
      <div className={`right-container ${isSmallScreen ? 'full-width' : ''}`}>
        <MusicPlayer
          selectedSong={selectedSong}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default App;
