import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';

import { getMapCenter, distanceInMiles, getStars } from '../helper';

export const customIcon = i =>
  new L.Icon({
    iconUrl: require(`../assets/icons/${i}.png`),
    iconSize: [35, 45]
  });

const BusinessMap = ({ businesses }) => {
  const [centerLat, centerLon] = getMapCenter(businesses);

  const markers = businesses.map((business, i) => {
    return (
      <Marker
        key={business.id}
        position={[
          business.coordinates.latitude,
          business.coordinates.longitude
        ]}
        icon={customIcon(i + 1)}
      >
        <Popup>
          <a href={business.url} target="_blank" rel="noopener noreferrer">
            <p style={{ margin: '0', padding: '0', fontWeight: 'bold' }}>
              {business.name}
            </p>
          </a>
          <img
            src={getStars(business)}
            alt="star rating"
            style={{ width: '75px', height: 'auto', paddingTop: '0.25rem' }}
          />
          <p style={{ margin: '0', padding: '0' }}>
            {distanceInMiles(business.distance)} mi
          </p>
        </Popup>
      </Marker>
    );
  });

  return (
    <Map
      center={[centerLat || 10, centerLon || 10]}
      zoom={12}
      maxZoom={18}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.3}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        id='mapbox/streets-v11'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        accessToken='pk.eyJ1IjoiY3Jhc2hidWciLCJhIjoiY2s3MTRjdzhnMDJ5azNmbnk5djdrbm5rdiJ9.T_U4xCOt9XE4HkhwxXdAmw'
      />
      {markers}
    </Map>
  );
};


BusinessMap.propTypes = {
  businesses: PropTypes.array.isRequired
};

export default BusinessMap;
