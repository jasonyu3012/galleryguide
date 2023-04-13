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

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json";

class ArenaChart extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.getArenaData = this.getArenaData.bind(this);
  }

  getArenaData () {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.nbadb.me/v1/json/arenas',
      headers: { }
    };
  
    var markersTemp = [];
    axios(config)
    .then(function (response) {
      response.data.data.map(arenaEntry => {
        markersTemp.push({markerOffset: -25, 
          name: arenaEntry.arenaname, 
          coordinates: [arenaEntry.long, arenaEntry.lat]})
        });
      console.log("markerstemp:", markersTemp);
      this.setState({ markers: markersTemp })
      console.log("markers:", this.state.markers);})
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount () {
    this.getArenaData();
    console.log("getting arena data");
    console.log(this.state.markers)
  };

  render () {
    return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1000}}>
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
      {console.log(this.state.markers)}
      {console.log(this.state.markers.length === undefined)}
      {this.state.markers.length !== undefined ? this.state.markers.map(({ markerOffset, name, coordinates }) => (
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
      )): <></>}
    </ComposableMap>
  )};
}






// const ArenaChart = () => {
//   // Get arena locations from the NBADB All Arenas API
//   var config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: 'https://api.nbadb.me/v1/json/arenas',
//     headers: { }
//   };

//   let markers = [];
//   axios(config)
//   .then(function (response) {
//     response.data.data.map(arenaEntry => {
//       markers.push({markerOffset: -25, 
//         name: arenaEntry.arenaname, 
//         coordinates: [arenaEntry.long, arenaEntry.lat]})
//       });
//     console.log(markers);
//     return (
//       <ComposableMap
//         projection="geoAlbersUsa"
//         projectionConfig={{
//           scale: 1000}}>
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#EAEAEC"
//                 stroke="#D6D6DA"
//               />
//             ))
//           }
//         </Geographies>
//         {markers.map(({ markerOffset, name, coordinates }) => (
//           <Marker key={name} coordinates={coordinates}>
//             <g
//               fill="none"
//               stroke="#FF5533"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               transform="translate(-12, -24)">
//               <circle cx="12" cy="10" r="3" />
//               <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
//             </g>
//             <text
//               textAnchor="middle"
//               y={markerOffset}
//               style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}>
//               {name}
//             </text>
//           </Marker>
//         ))}
//       </ComposableMap>
//     );
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

export default ArenaChart;
