const APP_KEY = process.env.REACT_APP_YELP || 'PLACEYOURYELPKEYHERE';

export default {
  search(searchTerm, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${location}&sort_by=${sortBy}`,
      {
        headers: { Authorization: `Bearer ${APP_KEY}` }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (
          response.businesses &&
          response.businesses.every(business => {
            return business !== undefined;
          }) &&
          response.businesses.length !== 0
        ) {
          return response.businesses.map(business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name || 'No Name',
              address: business.location.address1 || 'No Address',
              city: business.location.city || '',
              state: business.location.state || '',
              zipCode: business.location.zip_code,
              category: business.categories[0]
                ? business.categories[0].title
                : 'No Category',
              rating: business.rating,
              reviewCount: business.review_count,
              url: business.url
            };
          });
        } else {
          throw Error('Sorry no results were found');
        }
      });
  }
};
