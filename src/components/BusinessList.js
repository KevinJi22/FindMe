import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loading from './Loading';
import Error from './Error';
import Business from './SingleBusiness';
import Pagination from './Pagination';
import BusinessMap from './BusinessMap';
import AddressMap from './AddressMap';

import { parseSearchParams } from '../helper';
import yelpapi from '../yelpApi';

const ResultsWrapper = styled.section`
  .leaflet-container {
    width: 325px;
    height: 325px;
    margin: 1rem auto;
    z-index: 1;
  }

  .results__list {
    margin: 0;
    padding: 0;
  }

  @media screen and (min-width: 935px) {
    position: relative;

    .leaflet-container {
      margin-left: 45vw;
    }

    .map-container {
      position: ${props => (props.scrollY < '235' ? 'absolute' : 'fixed')};
      top: 0;
      left: 0;
      height: 100%;
      width: 350px;
    }

    .results {
      margin-right: 40vw;
    }
  }
`;

const BusinessList = ({ match, handleOutsideClick }) => {
  // Sync URL and UI through URL parameters
  const [term, location, latitude, longitude, page] = parseSearchParams(match);

  // State and effects for fetching the searched businesses
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await yelpapi.get('/businesses/search', {
          params: {
            term: term,
            location: location,
            latitude: latitude,
            longitude: longitude,
            offset: `${page * 20}`
          }
        });
        setBusinesses(response.data.businesses);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [term, location, latitude, longitude, page]);
  // State and effects for tracking vertical scroll
  // to control positioning of the address map
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => setScrollY(window.scrollY);

  useEffect(() => window.addEventListener('scroll', handleScroll), []);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Ensure we start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (isError) {
    return (
      <Error text="Hm, there is an issue with this search. Try another one!" />
    );
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ResultsWrapper
      data-testid="business-wrapper"
      scrollY={scrollY}
      onClick={handleOutsideClick}
    >
      {/* <div className="map-container">
        <BusinessMap businesses={businesses} />
      </div> */}
       <div className="map-container">
        <BusinessMap businesses={businesses} />
      </div>
      <section className="results">
        <ul className="results__list">
          {businesses.map((business, i) => (
            <li
              data-testid="business-list-item"
              key={business.id}
              className="results__item"
            >
              <Business
                className="results__card"
                index={i}
                business={business}
              />
            </li>
          ))}
        </ul>
      </section>
      <Pagination />
    </ResultsWrapper>
  );
};

BusinessList.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      locID: PropTypes.string.isRequired,
      pageID: PropTypes.string.isRequired,
      termID: PropTypes.string.isRequired
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  handleOutsideClick: PropTypes.func.isRequired
};

export default BusinessList;
