import React from 'react';
import Business from '../Business/Business';
import './BusinessList.scss';

const BusinessList = ({ businesses, message }) => {
  return message ? (
    <h3>{message}</h3>
  ) : (
    <div className="BusinessList">
      {businesses &&
        businesses.map(business => {
          return <Business key={business.id} business={business} />;
        })}
    </div>
  );
};

export default BusinessList;
