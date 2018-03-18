import React from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    if(term.trim() === '' && location.trim() === '') {
      this.setState({businesses: "Please enter a business name and location"});
      return;
    } else if (term.trim() === '') {
      this.setState({businesses: "Please enter a business name"});
      return;
    } else if (location.trim() === '') {
      this.setState({businesses: "Please enter a location"});
    } else {
      Yelp.search(term, location, sortBy).then(businesses => {this.setState({businesses: businesses})});
    }
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
