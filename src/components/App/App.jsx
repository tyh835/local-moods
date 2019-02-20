import React, { Component } from 'react';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../api/Yelp';
import './App.scss';

class App extends Component {
  state = {
    businesses: [],
  };

  searchYelp = (term, location, sortBy) => {
    if (term.trim() === '' && location.trim() === '') {
      this.setState({
        businesses: 'Please enter a business name and location',
      });
      return;
    } else if (term.trim() === '') {
      this.setState({ businesses: 'Please enter a business name' });
      return;
    } else if (location.trim() === '') {
      this.setState({ businesses: 'Please enter a location' });
    } else {
      Yelp.search(term, location, sortBy).then(businesses => {
        this.setState({ businesses: businesses });
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Moods</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
