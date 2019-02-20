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

  searchYelp = (term, location, sortBy) => {
    if (term.trim() === '' && location.trim() === '') {
      this.setState({
        businesses: [],
        message: 'Please enter a business name and location'
      });
      return;
    } else if (term.trim() === '') {
      this.setState({
        businesses: [],
        message: 'Please enter a business name'
      });
      return;
    } else if (location.trim() === '') {
      this.setState({ businesses: [], message: 'Please enter a location' });
    } else {
      Yelp.search(term, location, sortBy)
        .then(businesses => {
          if (typeof businesses === 'string') {
            return this.setState({
              businesses: [],
              message: businesses
            });
          }

          this.setState({ businesses: businesses, message: '' });
        })
        .catch(err =>
          this.setState({
            businesses: [],
            message: err.message
          })
        );
    }
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
