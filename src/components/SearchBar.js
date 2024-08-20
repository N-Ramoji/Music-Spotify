import React from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa'; // Importing a search icon from react-icons

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search song, Artist"
        onChange={(e) => onSearch(e.target.value)}
      />
      <FaSearch className="search-bar-icon" />
    </div>
  );
};

export default SearchBar;
