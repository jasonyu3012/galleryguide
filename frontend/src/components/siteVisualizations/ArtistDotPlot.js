import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";

const data = [
  { name: 'A', value: 5 },
  { name: 'B', value: 3 },
  { name: 'C', value: 2 },
  { name: 'D', value: 4 },
];

const App = ({data}) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // This is where you would fetch your data from your API or database
    const rawData = data
    
    // This is where you would count the number of times the attribute occurs in your dataset
    const countData = rawData.reduce((acc, curr) => {
      const key = curr.death_year;
      if (acc[key]) {
        acc[key] += 1;
      } else {
        acc[key] = 1;
      }
      return acc;
    }, {});

    // This is where you would transform your data into a format that Recharts can use
    const chartData = Object.keys(countData).map((key) => ({
      name: key,
      value: countData[key],
    }));

    setChartData(chartData);
  }, []);

  return (
    <BarChart width={1000} height={700} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default App;
