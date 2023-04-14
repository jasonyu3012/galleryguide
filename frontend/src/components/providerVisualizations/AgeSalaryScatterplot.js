import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AgeSalaryScatterplot = (props) => {
    var data = props.data;
    data.forEach(entry => {
      var ageDate = new Date(Date.now() - Date.parse(entry.birthday));
      entry.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    })

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="salary" name="salary" unit="USD" />
          <YAxis type="number" dataKey="age" name="age" unit="yrs" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    );
}

export default AgeSalaryScatterplot;
