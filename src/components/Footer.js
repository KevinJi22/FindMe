import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import yelpLogo from '../assets/yelp-icons/Yelp_trademark_RGB.png';

const StyledFooter = styled.footer`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
 

  .footer__yelp-credit,
  .footer__map-credit,
  .footer__icon-credit {
    color: black;
    text-align: center;
    position: fixed;
    bottom: 0;
  }

  .footer__yelp-icon {
    width: 200px;
    height: auto;
    position: fixed;
    bottom: 5px;
  }


  .footer__yelp-link,
`;
const Footer = ({ handleOutsideClick }) => (
  <StyledFooter className="footer" onClick={handleOutsideClick}>
    <img className="footer__yelp-icon" src={yelpLogo} alt="logo" />
    <p className="footer__yelp-credit">
      Made using the Yelp Fusion API
    </p>
  </StyledFooter>
);

Footer.propTypes = {
  handleOutsideClick: PropTypes.func.isRequired
};

export default Footer;
