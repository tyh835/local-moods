import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // For development configuration

export async function handler(event, context, callback) {
  try {
    const { term, location, sort_by, offset } = event.queryStringParameters;
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sort_by}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` }
      }
    );
    const { businesses } = response.data;

    const data = businesses.map(business => {
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

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ businesses: data })
    });
  } catch (err) {
    console.log(err); // Log stderr to Netlify
    if (err.errorMessage === 'Request failed with status code 400') {
      return callback(null, {
        statusCode: 204,
        body: JSON.stringify({ businesses: [] })
      });
    }

    callback(err);
  }
}
