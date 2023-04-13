// ArenaChart.js, based on examples from https://www.react-simple-maps.io
import React from "react";
// Library imports
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json";

// Get arena locations from the NBADB All Arenas API
var config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.nbadb.me/v1/json/arenas',
  headers: { }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  console.log(response.data);
  // Set up the markers by mapping each arena's longitude, latitude, and city name
})
.catch((error) => {
  console.log(error);
});


const markers = [
  { markerOffset: -25, name: "Dallas", coordinates: [-96.810278, 32.790556]}
];

const ArenaChart = () => {
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1000
      }}>
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
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)">
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default ArenaChart;
