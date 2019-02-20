import React, { Component } from 'react';
import './SearchBar.scss';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};

const SearchBar = ({
  handleInputChange,
  handleKeyPress,
  handleSortByChange,
  searchYelp,
  search: { searchTerm, location, sortBy }
}) => {
  const renderSortByOptions = sortBy => {
    return Object.keys(sortByOptions).map(sortByOption => {
      const sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={sortByOptionValue === sortBy ? 'active' : ''}
          onClick={() => handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>{renderSortByOptions(sortBy)}</ul>
      </div>
      <div className="SearchBar-fields">
        <input
          placeholder="Search Restaurants"
          name="searchTerm"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <input
          placeholder="Where?"
          name="location"
          value={location}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="SearchBar-submit" onClick={searchYelp}>
        <button>Let&#39;s Go</button>
      </div>
    </div>
  );
};

export default SearchBar;
