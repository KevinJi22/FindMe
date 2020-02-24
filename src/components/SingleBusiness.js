import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BusinessInfo from './BusinessInformation';

const BusinessContainer = styled.div`
  margin: 1rem 1rem 2rem 1rem;
  border: 1px lightgrey solid;
  border-radius: 5px;
  max-width: 800px;
  background: white;
  position: relative;

  .business__photo-info {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 50vw) {
    padding: 0;
    .business__photo-info {
      flex-direction: row;
    }
  }
`;

const CoverPhoto = styled.div`
  height: 175px;
  width: 175px;
  background-image: url("${props => props.image_url}");
  background-position: center 75%;
  background-size: cover;
  border-radius: 5px 5px 0 0;
  border: 1.5px lightgrey solid;
  
  @media screen and (min-width: 600px) {
    min-width: 175px;
    border-radius: 5px 0 0 5px;
  }
`;

const Business = ({ index, business }) => {

  return (
    <BusinessContainer
      className="business"
    >
      <div className="business__photo-info">
        <CoverPhoto className="business__photo" image_url={business.image_url} />
        <BusinessInfo
          className="card__info"
          index={index}
          business={business}
        />
      </div>
    </BusinessContainer>
  );
};

Business.propTypes = {
  index: PropTypes.number.isRequired,
  business: PropTypes.shape({
    alias: PropTypes.string,
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

export default Business;
