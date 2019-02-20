import React, { Component } from 'react';
import './SearchBar.scss';

class SearchBar extends Component {
  state = {
    searchTerm: '',
    location: '',
    sortBy: 'best_match'
  };

  sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  handleSortByChange = sortByOption => {
    this.setState({ sortBy: sortByOption });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSearch = event => {
    event.preventDefault();
    const { searchTerm, location, sortBy } = this.state;
    this.props.searchYelp(searchTerm, location, sortBy);
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSearch(event);
    }
  };

  renderSortByOptions = () => {
    const { sortBy } = this.state;
    return Object.keys(this.sortByOptions).map(sortByOption => {
      const sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={sortByOptionValue === sortBy ? 'active' : ''}
          onClick={() => this.handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            placeholder="Search Restaurants"
            name="searchTerm"
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          <input
            placeholder="Where?"
            name="location"
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="SearchBar-submit" onClick={this.handleSearch}>
          <a href="/">Let&#39;s Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
