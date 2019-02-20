const APP_KEY = process.env.REACT_APP_YELP || 'PLACEYOURYELPKEYHERE';
const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: { Authorization: `Bearer ${APP_KEY}` }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (
          jsonResponse.businesses &&
          jsonResponse.businesses.every(business => {
            return business !== undefined;
          }) &&
          jsonResponse.businesses.length !== 0
        ) {
          console.log(jsonResponse.businesses);
          return jsonResponse.businesses.map(business => {
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
          return 'Sorry no results were found';
        }
      });
  }
};

export default Yelp;
