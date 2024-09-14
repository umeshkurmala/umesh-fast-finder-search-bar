import React, { useState } from 'react';
import countries from './countries.json'; // Import the local JSON file
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      // Filter the local JSON data based on user input
      const filtered = countries.filter(item =>
        item.country.toLowerCase().includes(value.toLowerCase()) ||
        item.capital.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (item) => {
    setQuery(`${item.country} (${item.capital})`);
    onSearch(item.country); // Pass the selected country to the parent component
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={handleChange}
        placeholder="Search for a country or capital..."
      />
      <FaSearch className="search-icon" onClick={() => onSearch(query)} />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(item)}
            >
              {item.country} ({item.capital})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
