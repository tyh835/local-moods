import axios from 'axios';

export default {
  async search(searchTerm, location, sortBy, offset) {
    try {
      return await axios.get(
        `/.netlify/functions/search?term=${searchTerm}&location=${location}&sort_by=${sortBy}&offset=${offset}`
      );
    } catch (err) {
      throw Error('Sorry, no results were found');
    }
  }
};
