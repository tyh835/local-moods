import React, { Component } from 'react';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../api/Yelp';
import './App.scss';

class App extends Component {
  state = {
    businesses: [],
    message: ''
  };

  searchYelp = (searchTerm, location, sortBy) => {
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

    Yelp.search(searchTerm, location, sortBy)
      .then(businesses => {
        this.setState({ businesses });
      })
      .catch(err => {
        const { message } = err;
        this.setState({ message });
      });
  };

  render() {
    const { businesses, message } = this.state;
    return (
      <div className="App">
        <h1>MoodFoods</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={businesses} message={message} />
      </div>
    );
  }
}

export default App;
