const apiKey = 'qtmJhKy8QUVzBV8Yeyv0QrWzA6EajgTwABU08nkp_SKBPyxh2eE2azsZ_Db-eQEjjQCjcejsZN9sGOSXgGU46zcUDvsNzQKzQKirQdwm-xq41wNh_iKN3QLnQzObWnYx';
const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {Authorization: `Bearer ${apiKey}`}
    }).then(response => {return response.json();}).then(
      jsonResponse => {if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(
          business => {return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }}
        );
      }
    });
  }
};

export default Yelp;
