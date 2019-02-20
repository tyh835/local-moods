import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../api/Yelp';
import './App.scss';

class App extends Component {
  state = {
    businesses: [],
    message: '',
    search: {
      searchTerm: '',
      location: '',
      sortBy: 'best_match',
      offset: 0
    }
  };

  handleSortByChange = sortByOption => {
    this.setState(state => ({
      businesses: [],
      search: {
        ...state.search,
        sortBy: sortByOption,
        offset: 0
      }
    }));
    this.searchYelp();
  };

  handleInputChange = e => {
    e.persist();
    this.setState(state => ({
      businesses: [],
      search: {
        ...state.search,
        [e.target.name]: e.target.value,
        offset: 0
      }
    }));
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.searchYelp();
    }
  };

  increaseOffset = () => {
    this.setState(state => {
      return {
        search: {
          ...state.search,
          offset: state.search.offset + 20
        }
      };
    });
  };

  searchYelp = async () => {
    const { searchTerm, location, sortBy, offset } = this.state.search;
    const s = searchTerm.trim();
    const l = location.trim();
    let message = '';

    if (s === '' && l === '') {
      message = 'Please enter a business name and location';
    } else if (s === '') {
      message = 'Please enter a business name';
    } else if (l === '') {
      message = 'Please enter a location';
    }
    if (message) return this.setState({ businesses: [], message });

    try {
      const response = await Yelp.search(searchTerm, location, sortBy, offset);
      this.setState(state => ({
        message: '',
        businesses: [...state.businesses, ...response.data]
      }));
    } catch (err) {
      this.setState({ business: [], message: err.message });
    }

    this.increaseOffset();
  };

  render() {
    const { businesses, message, search } = this.state;
    return (
      <div className="App">
        <h1>LocalMoods</h1>
        <SearchBar
          handleInputChange={this.handleInputChange}
          handleSortByChange={this.handleSortByChange}
          handleKeyPress={this.handleKeyPress}
          search={search}
          searchYelp={this.searchYelp}
        />
        <InfiniteScroll
          dataLength={businesses.length}
          next={this.searchYelp}
          hasMore={true}
        >
          <BusinessList businesses={businesses} message={message} />
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
