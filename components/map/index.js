import React from 'react';
import GoogleMapReact from 'google-map-react';
import {HiOutlineLocationMarker as PinIcon } from 'react-icons';

const LocationPin = ({ text }) => {
  return (
  <div className="pin">
    <PinIcon />
    <p className="pin-text">{text}</p>
  </div>
  );
}

const GOOGLE_MAP_API_KEY = "AIzaSyAOSwHxjmToTZuhJFSTol5KtUGL9mL197E";

const Map = ({ location, zoomLevel }) => (
  <div className="map">

    <div className="google-map">
      <GoogleMapReact
      apiKey={GOOGLE_MAP_API_KEY}
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
      </GoogleMapReact>
    </div>
  </div>
)


export default Map;