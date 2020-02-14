import React from "react";
import { Card } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

import SalariesTable from "../Containers/SalariesTable";
import Filter from "../Containers/Filter";

const SalaryAnalytics = props => {
  return (
    <div>
      <Card
        extra={<Filter />}
        headStyle={{ alignItems: "center" }}
        style={{ marginBottom: 20 }}
      >
        <div style={{ margin: "auto", width: "fit-content" }}>
          <LineChart width={700} height={400} data={props.chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {props.chartLines.map(line => (
              <Line {...line} key={line.dataKey} />
            ))}
          </LineChart>
        </div>
      </Card>

      {/* <SalariesTable /> */}
    </div>
  );
};

export default SalaryAnalytics;
