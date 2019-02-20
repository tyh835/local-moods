import React from 'react';
import './Business.scss';

class Business extends React.Component {
  render() {
    return (
      <div className="Business">
        <div className="image-container">
          <img
            src={this.props.business.imageSrc}
            alt={'No image for ' + this.props.business.name}
          />
        </div>
        <div className="Business-information">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${this.props.business.name
              .split(' ')
              .filter(word => word !== '&')
              .join('+')}+${this.props.business.address
              .split(' ')
              .join('+')}+${this.props.business.city
              .split(' ')
              .join('+')}+${this.props.business.state.split(' ').join('+')}`}
            title={`Find ${this.props.business.name} on Google Maps!`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>{this.props.business.name}</h2>
            <div className="Business-address">
              <p>
                <i className="fa fa-map-marker" /> {this.props.business.address}
              </p>
              <p>{this.props.business.city}</p>
              <p>
                {this.props.business.state} {this.props.business.zipCode}
              </p>
            </div>
          </a>
          <a
            href={this.props.business.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${this.props.business.name} on Yelp!`}
          >
            <div className="Business-reviews">
              <h3>{this.props.business.category}</h3>
              <h3 className="rating">
                <i className="fa fa-yelp" /> {this.props.business.rating} stars
              </h3>
              <p>{this.props.business.reviewCount} reviews</p>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Business;
