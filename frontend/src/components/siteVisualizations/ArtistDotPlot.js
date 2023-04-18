import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis } from 'recharts';

const ScatterPlot = ({ data }) => {
  return (
    <ScatterChart width={400} height={400}>
      <XAxis type="number" dataKey="death_year" />
      <YAxis type="number" />
      <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

export default ScatterPlot;
