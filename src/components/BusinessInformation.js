import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { distanceInMiles, getStars } from '../helper';

const InfoContainer = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  flex: 1;

  .info__row1,
  .info__row2,
  .info__row4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .info__row1-name {
    font-size: 1.25em;
    font-weight: bold;
    font-family: 'Karla', sans-serif;
    margin: 0;
    padding: 0;
  }

  .info__row1-index {
    color: black;
  }

  .info__row1-stars-count {
    display: flex;
    align-items: center;
  }

  .info__row1-stars {
    width: 100px;
    height: auto;
  }

  .info__row1-count {
    color: grey;
    padding-left: 0.5rem;
    font-size: 0.9em;
  }

  .info__row2 {
    padding-top: 1rem;
  }

  .info__row2-categories {
    margin: 0;
    padding: 0;
  }

  .info__row2-price-distance {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
  }


  .info__row3-address1,
  .info__row3-address2 {
    margin: 0;
    padding: 0;
    text-align: right;
  }

  .info__row3-zipcode {
    margin-left: 0.3rem;
  }

  .info__row3-phone {
    margin: 0;
    padding: 0;
    text-align: right;
  }


  .icon-circle {
    margin: 0 0.5rem;
    font-size: 6px;
    color: grey;
  }

  @media screen and (min-width: 600px) {
    .info__row4 {
      padding-bottom: 0;
    }
  }
`;

const BusinessInfo = ({ index, business }) => {
  const categories = business.categories
    .slice(0, 2)
    .map(category => category.title)
    .join(', ');
  return (
    <InfoContainer>
      <div className="info__row1">
        <a
          data-testid="business-link"
          href={business.url}
          target="_blank"
          rel="noopener noreferrer"
          className="info__row1-link"
        >
          <p className="info__row1-name">
            <span className="info__row1-index">{index + 1}. </span>
            {business.name}
          </p>
        </a>
        <div className="info__row1-stars-count">
          <img
            className="info__row1-stars"
            src={getStars(business)}
            alt="star rating"
          />
          <span data-testid="review-count" className="info__row1-count">
            {business.review_count} reviews
          </span>
        </div>
      </div>

      <div className="info__row2">
      <p className="info__row2-categories">{categories}</p>
        <div className="info__row2-price-distance">
          <span className="info__row2-price">
            {business.price ? business.price : 'No data!'}
          </span>
          <FontAwesomeIcon className="icon-circle" icon={faCircle} />
          <span className="info__row2--distance">
            {distanceInMiles(business.distance)} mi
          </span>
        </div>
      </div>
      
     

      <div className="info__row3">
        <div data-testid="business-address" className="info__row3-address">
            <p className="info__row3-address1">{business.location.address1}</p>
            <p className="info__row3-address2">
              {business.location.city}, {business.location.state}
              <span className="info__row3-zipcode">
                {business.location.zip_code}
              </span>
            </p>
            <p className="info__row3-phone">{business.display_phone}</p>
          </div>
      </div>
    </InfoContainer>
  );
};

BusinessInfo.propTypes = {
  index: PropTypes.number.isRequired,
  business: PropTypes.shape({
    alias: PropTypes.string,
    categories: PropTypes.array.isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }),
    display_phone: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    location: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      address3: PropTypes.string,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      display_address: PropTypes.array.isRequired,
      state: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired
    }),
    name: PropTypes.string.isRequired,
    price: PropTypes.string,
    rating: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    transactions: PropTypes.array,
    url: PropTypes.string.isRequired
  })
};

export default BusinessInfo;
