import React from 'react';
import './Business.scss';
import { normalize } from '../../utils/query';

const Business = ({
  business: {
    address,
    category,
    city,
    imageSrc,
    name,
    rating,
    reviewCount,
    state,
    url,
    zipCode
  }
}) => {
  const getNormalizedQuery = () => {
    return (
      'https://www.google.com/maps/search/?api=1&query=' +
      `${normalize(name)}+${normalize(address)}+` +
      `${normalize(city)}+${normalize(state)}`
    );
  };

  return (
    <div className="Business">
      <div className="image-container">
        <img src={imageSrc} alt={`No image for ${name}`} />
      </div>
      <div className="Business-information">
        <a
          href={getNormalizedQuery()}
          title={`Find ${name} on Google Maps!`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>{name}</h2>
          <div className="Business-address">
            <p>
              <i className="fa fa-map-marker" /> {address}
            </p>
            <p>{city}</p>
            <p>
              {state} {zipCode}
            </p>
          </div>
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`See ${name} on Yelp!`}
        >
          <div className="Business-reviews">
            <h3>{category}</h3>
            <h3 className="rating">
              <i className="fa fa-yelp" /> {rating} stars
            </h3>
            <p>{reviewCount} reviews</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Business;
