// Histogram creator for the jersey numbers
// Use AG Grid for visualization
import React, { useState, useEffect } from "react";
import { AgChartsReact } from 'ag-charts-react';

const JerseyHistogram = (props) => {
  console.log("jersey hist props:", props);
  console.log("less than 0?:", props.data.filter(entry => entry.jersey <= 0));
  const [options, setOptions] = useState({
    theme: 'ag-vivid',
    title: {
      text: 'Frequency of Jersey Numbers in NBAdb',
    },
    data: props.data.filter(entry => entry.jersey >= 0),
    series: [
      {
        type: 'histogram',
        xKey: 'jersey',
        xName: 'Jersey Number',
      },
    ],
    legend: {
      enabled: false,
    },
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: { text: 'Jersey band' },
        tick: { interval: 10 },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Number of players' },
      },
    ],
  });

  return <AgChartsReact options={options} />;
};

export default JerseyHistogram;
