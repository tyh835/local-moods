import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
  render() {
    if (typeof this.props.businesses === "string") {
      return <h3>{this.props.businesses}</h3>;
    }
    return (
    <div className="BusinessList">
      {
        this.props.businesses.map(business => {return <Business key={business.id} business={business} />})
      }
    </div>
    );
  }
};

export default BusinessList;
