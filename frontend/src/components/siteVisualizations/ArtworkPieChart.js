import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';



const COLORS = ['#FF5733', '#C70039', '#900C3F', '#FFC300', '#2ECC71', '#16A085', '#3498DB', '#2980B9', '#8E44AD'];

const SimplePieChart = ({data}) => {
  const filteredData = data.filter((entry) => entry.num_artworks >= 10);
  return (
    <PieChart width={1000} height={600}>
      <Legend />
      <Pie
        data={filteredData}
        dataKey="num_artworks"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={160}
        fill="#8884d8"
        label={(entry) => entry.name}
      >
        {filteredData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default SimplePieChart;
