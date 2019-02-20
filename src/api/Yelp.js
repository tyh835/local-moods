import axios from 'axios';

export default {
  async search(searchTerm, location, sortBy, offset) {
    try {
      const response = await axios.get(
        `/.netlify/functions/search?term=${searchTerm}&location=${location}&sort_by=${sortBy}&offset=${offset}`
      );
      return response.data.businesses;
    } catch (err) {
      throw err;
    }
  }
};
