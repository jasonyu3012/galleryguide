// ArenaChart.js, based on examples from https://www.react-simple-maps.io
// Use React Simple Maps
import React, { useState, useEffect } from 'react';
// Library imports
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json";

function ArenaChart (props) {
  const markers = props.markers;
  if (!markers || !Array.isArray(markers)) return null;

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1000
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {markers.map(marker => (marker.country === "USA" && marker.long && marker.lat ?
        <Marker key={marker.arenaname} coordinates={[marker.long, marker.lat]}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={-25}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
            {marker.arenaname}
          </text>
        </Marker>
     : null))}
    </ComposableMap>
  );
};

export default ArenaChart;
