import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';



const COLORS = [
'#FF6B6B',
'#FFE66D',
'#56CCF2',
'#F8C471',
'#00BFFF',
'#FF7F50',
'#2ECC71',
'#E74C3C',
'#8E44AD',
'#F1C40F',
'#3498DB',
'#E74C3C',
'#FFA07A',
'#00CED1',
'#1ABC9C',
'#FF5733', ];
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
        label={(entry) => entry.value}
      >
        {filteredData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default SimplePieChart;
