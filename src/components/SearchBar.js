import React, * as react from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapPin, faSearch, faLocationArrow} from '@fortawesome/free-solid-svg-icons';

import { createSearchSlug } from '../helper';

const Header = styled.header`
  position: relative;
  background: linear-gradient(to bottom right, #e52d27, #b31217);

  .header__title {
    color: white;
    margin: 0;
    padding: 0.5rem 0 0 0;
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .form__icon-person {
    position: absolute;
    top: 7px;
    left: 8px;
    font-size: 20px;
    color: black;
  }

  .form__input-business-container,
  .form__input-user-location-container {
    position: relative;
    width: 100%;
  }

  .form__icon-marker {
    position: absolute;
    top: 7px;
    left: 10px;
    font-size: 20px;
    color: black;
  }

  .form__input,
  .form__input-user-location {
    padding: 0.5rem 1rem 0.5rem 35px;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    font-size: 16px;
    width: 80%;
  }

  .form__button {
    border-radius: 10px;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    background: #E0E0E0;
    border: 1px lightgrey solid;
    width: 100%;
    transition: background 0.2s ease-in-out;
  }


  .form__button-icon {
    margin-left: 5rem;
  }

  .form__user-location-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 140px;
    width: 100%;
    background: white;
    z-index: 2;
    cursor: pointer;
    border-bottom: 1px lightgrey solid;
  }

  .form__user-location-list {
    top: 96px;
  }

  .form__user-location-list {
    display: ${props =>
      props.focus === 'form__input-user-location' ? 'block' : 'none'};
  }

  .form__food-item:first-child,
  .form__user-location-item:first-child {
    border-top: 1px lightgrey solid;
  }

  .form__food-item,
  .form__user-location-item {
    padding: 0.5rem 1rem;
  }

  .form__icon-arrow {
    color: blue;
  }

  .form__current-location {
    color: blue;
    padding-left: 0.5rem;
  }

  @media screen and (min-width: 901px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .header__title {
      padding: 0;
    }

    .form {
      display: flex;
      flex-direction: row;
    }

    .form__input,
    .form__input-user-location {
      margin-bottom: 0;
      min-width: 315px;
      border: transparent;
    }

    .form__input {
      border-radius: 0;
    }

    .form__input-user-location {
      border-radius: 0;
      border-left: 1px black solid;
    }

    .form__button {
      width: auto;
      border-radius: 0 5px 5px 0;
      border: 0;
      color: black;
    }

    .form__button-icon {
      margin: 0;
    }

    .form__button-text {
      display: none;
    }

    .form__user-location-list {
      top: 34px;
      width: 315px;
      border-left: 1px lightgrey solid;
      border-right: 1px lightgrey solid;
    }
  }

  @media (hover: hover) {
    .form__user-location-item:hover {
      background: #DCDCDC;
    }

  }
`;

const SearchBar = ({
  history,
  input,
  setInput,
  focus,
  setFocus,
  handleOutsideClick
}) => {
  const [inputLocation, setInputLocation] = react.useState('');
  const [isLoadingLocation, setIsLoadingLocation] = react.useState(false);
  const [lat, setLat] = react.useState(null);
  const [lon, setLon] = react.useState(null);
  const [isError, setIsError] = react.useState(false);

  const locationSuccess = position => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
    setInputLocation('Current Location');
    setIsLoadingLocation(false);
  };

  const locationError = err => {
    setInputLocation('Error finding location, try a new spot.');
    setIsLoadingLocation(false);
    //console.log(err.message)
  };

  const handleUserLocationClick = e => {
    const text = e.target.textContent;
    if (text === 'Current Location' || text === '') {
      setIsLoadingLocation(true);
      setInputLocation('Finding your location...');
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
      setInputLocation(text);
    }
  };

  const handleFormSubmit = () => {
    const isValid = input !== '' && inputLocation !== '';
    if (isValid) {
      const searchSlug = createSearchSlug(input, inputLocation, lat, lon);
      // Hide suggestion lists and navigate to the results page
      setFocus(null);
      history.push(searchSlug);
    } else {
      // TODO: Potentially display error message
    }
  };

  return (
    <Header
      isLoadingLocation={isLoadingLocation}
      focus={focus}
      onClick={handleOutsideClick}
    >
      <Link className="header__link" to="/">
        <h1 className="header__title">
          Find Me...
        </h1>
      </Link>
      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__input-business-container">
        <FontAwesomeIcon className="form__icon-person" icon={faUser} />
          <input
            className="form__input"
            type="text"
            placeholder="What are you looking for?"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={e => setFocus(e.target.classList.value)}
          />
        </div>
        <div className="form__input-user-location-container">
          <FontAwesomeIcon
            className="form__icon-marker"
            icon={faMapPin}
          />
          <input
            className="form__input-user-location"
            type="text"
            placeholder="City, neighborhood, zipcode, etc."
            value={inputLocation}
            onChange={e => setInputLocation(e.target.value)}
            onFocus={e => setFocus(e.target.classList.value)}
          />
          <ul
            className="form__user-location-list"
            onClick={e => {
              handleUserLocationClick(e);
              setFocus(null);
            }}
          >
            <li className="form__user-location-item">
              <FontAwesomeIcon
                className="form__icon-arrow"
                icon={faLocationArrow}
              />
              <span className="form__current-location">Current Location</span>
            </li>
            <li className="form__user-location-item">New York, NY</li>
            <li className="form__user-location-item">Los Angeles, CA</li>
            <li className="form__user-location-item">Seattle, WA</li>
            <li className="form__user-location-item">Boston, MA</li>
            <li className="form__user-location-item">Miami, FL</li>
            <li className="form__user-location-item">San Francisco, CA</li>
            <li className="form__user-location-item">Chicago, IL</li>
          </ul>
        </div>
        <button
          data-testid="form-button"
          className="form__button"
          type="submit"
          disabled={isLoadingLocation}
          onClick={() => handleFormSubmit()}
          onFocus={() => setFocus(null)}
        >
          <FontAwesomeIcon className="form__button-icon" icon={faSearch} />
          <span className="form__button-text">Search</span>
        </button>
      </form>
    </Header>
  );
};

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  input: PropTypes.string,
  setInput: PropTypes.func.isRequired,
  focus: PropTypes.string,
  setFocus: PropTypes.func.isRequired,
  handleOutsideClick: PropTypes.func.isRequired
};

export default withRouter(SearchBar);
