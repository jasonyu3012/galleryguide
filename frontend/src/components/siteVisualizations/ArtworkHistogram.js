import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



const Histogram = ( {data}) => {

  function getIconicityBins(data) {
    const filteredData = data.filter((entry) => entry.iconicity <= 100);
    const minIconicity = Math.min(...filteredData.map(d => d.iconicity));
    const maxIconicity = Math.max(...filteredData.map(d => d.iconicity));
    const binSize = (maxIconicity - minIconicity) / 10;

    const bins = Array(10).fill(0);
    filteredData.forEach(d => {
      const binIndex = Math.floor((d.iconicity - minIconicity) / binSize);
      bins[binIndex]++;
    });

    const binLabels = Array(10).fill().map((_, i) => {
      const binMin = (i * binSize) + minIconicity;
      const binMax = ((i + 1) * binSize) + minIconicity;
      return {
        bin: `${binMin.toFixed(2)} - ${binMax.toFixed(2)}`,
        count: bins[i]
      };
    });

    return binLabels;
  }
  
  const iconicityBins = getIconicityBins(data);

  return (
    <BarChart width={1000} height={600} data={iconicityBins}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="bin" label={{ value: 'Iconicity Range', position: 'insideBottom', offset: 0 }} />
      <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default Histogram;
