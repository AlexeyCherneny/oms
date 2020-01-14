import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const BarChartComponent = props => (
  <BarChart width={600} height={280} data={props.data}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />

    <Bar dataKey="Доходы" fill="#0074D9" />

    <Bar dataKey="Расходы" fill="#FF4136" />
  </BarChart>
);

export default BarChartComponent;
