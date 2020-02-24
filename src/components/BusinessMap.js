import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
// import PropTypes from 'prop-types';

import { getMapCenter, distanceInMiles } from '../helper';

export const icon = i =>
  new L.Icon({
    iconUrl: require(`../assets/icons/${i}.png`),
    iconSize: [30, 40]
  });

  const BusinessMap = ({ businesses }) => {
    const [centerLat, centerLng] = getMapCenter(businesses);
    // const markers = businesses.map((business, i) => {
    //   return (
    //     <Marker
    //       key={business.id}
    //       position={[
    //         business.coordinates.latitude,
    //         business.coordinates.longitude
    //       ]}
    //       icon={icon(i+1)}
    //   >
    //     <Popup>
    //       <a href={business.url} target="_blank" rel="noopener noreferrer">
    //         <p style={{ margin: '0', padding: '0' }}>
    //           {business.name}
    //         </p>
    //       </a>
    //       <p style={{ margin: '0', padding: '0'}}>
    //         {distanceInMiles(business.distance)} mi
    //       </p>
    //     </Popup>
    //   </Marker>
    //   );
    // });

    return (
      <Map
        // center={[centerLat || 25, centerLng || -120]}
        center={[ parseFloat(centerLat), parseFloat(centerLng) ]}
        zoom={10}
        maxZoom={15}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {/* {markers} */}
      </Map>
    );
  };

export default BusinessMap;