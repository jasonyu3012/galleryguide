// ArenaChart.js, based on examples from https://www.react-simple-maps.io
import React, { useState, useEffect } from 'react';
// Library imports
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";


// export const getArenas = async () => {
//   var config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: 'https://api.nbadb.me/v1/json/arenas',
//     headers: { }
//   };

//   var response = await axios(config);
//   // .then(function (response) {
//   //   console.log(JSON.stringify(response.data));
//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });

//   console.log(response);
// }

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json";

// const markers = [
//   {markerOffset: -25, name: "Dallas", coordinates: [-96.810278, 32.790556]}
// ];

const ArenaChart = () => {
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    const apiResponse = async () => {
      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.nbadb.me/v1/json/arenas',
        headers: { }
      };

      const response = await axios(config);
      console.log("response data data:", response.data.data)
      var temp = [
        {markerOffset: -25, name: "Dallas", coordinates: [-96.810278, 32.790556]}
      ];
      await response.data.data.forEach(arena => {
        temp.push({markerOffset: -25, name: arena.arenaname, coordinates: [arena.long, arena.lat]})
      })
      await setMarkers(temp);
      console.log("markers data:", markers)
      console.log(markers.length)
      setLoading(false);
    }

    apiResponse();
  }, []);


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
      {loading || markers.length === undefined || markers.length === 0 ? (<h4>Loading...</h4>) : markers.map(marker => (
        <Marker key={marker.name} coordinates={marker.coordinates}>
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
            y={marker.markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
            {marker.name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default ArenaChart;
