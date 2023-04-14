// React imports
import React, { useState, useEffect } from "react";
// Library imports
import axios from "axios";

import ArenaChart from "../providerVisualizations/ArenaChart";
import JerseyHistogram from "../providerVisualizations/JerseyHistogram";
import AgeSalaryScatterplot from "../providerVisualizations/AgeSalaryScatterplot";

const ProviderVisualizations = () => {
    const [markers, setMarkers] = useState(undefined);
    const [players, setPlayers] = useState(undefined);

    useEffect (() => {
      // Get arena data
      axios.get('https://api.nbadb.me/v1/json/arenas')
      .then(response => {
        console.log("response data", response.data.data)
        setMarkers(response.data.data)
      })
      .catch((error) => {
        console.log("axios error while getting arena info: ", error);
      })
      
      // Get player data
      axios.get('https://api.nbadb.me/v1/json/players')
      .then(response => {
        console.log("response data", response.data.data)
        setPlayers(response.data.data)
      })
      .catch((error) => {
        console.log("axios error while getting player info: ", error);
      })
    }, [])

    return ((markers && markers.length > 0) && (players && players.length > 0) ?
      <div>
        <h1>Provider Visualizations</h1>
        <div>
          <h2>USA Arena Locations</h2>
          <p>Shows a marker for each arena in the location with the arena name labeled above it. Note that only the arenas in the US are shown!</p>
          <ArenaChart markers={markers}/>
        </div>
        <div>
          <h2>Player Salaries v. Age</h2>
          <p>We were curious if there was any clear correlation between age and salary. See for yourself.</p>
          <AgeSalaryScatterplot data={players}/>
        </div>
        <div>
          <h2>Player Jersey Numbers</h2>
          <p>Is an interesting distribution in the jersey numbers chosen (eg. for lucky numbers, etc)?</p>
          <JerseyHistogram data={players}/>
        </div>
      </div>
    : <></>);
}

export default ProviderVisualizations;