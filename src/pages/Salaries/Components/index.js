import React from "react";
import { Card, Row, Col, Button } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

import SalariesTable from "../Containers/SalariesTable";
import { ROLES } from "../../../services/constants";
import Filter from "../Containers/Filter";

const SalariesPage = props => {
  const isHR = props.user.roles.includes(ROLES.HR);

  return (
    <div>
      <Row gutter={24} type="flex" justify="space-between">
        <Col span={4}></Col>
        <Col span={16} style={{ minWidth: 540 }}>
          <Card
            title="Зарплаты"
            extra={<Filter />}
            headStyle={{ alignItems: "center" }}
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
        </Col>
        <Col span={4}></Col>
      </Row>

      <Row
        gutter={24}
        type="flex"
        justify="space-between"
        style={{ paddingTop: 15, paddingBottom: 15 }}
      >
        <Col span={4} />
        <Col span={16} style={{ minWidth: 540 }}>
          <Card>
            {isHR && (
              <Row
                type="flex"
                justify="end"
                style={{ marginBottom: 30, minHeight: 32 }}
              >
                <Col>
                  <Button onClick={props.handleCreate}>Создать</Button>
                </Col>
              </Row>
            )}
            <SalariesTable />
          </Card>
        </Col>
        <Col span={4} />
      </Row>
    </div>
  );
};

export default SalariesPage;
