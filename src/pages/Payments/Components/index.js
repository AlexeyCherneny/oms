import React from "react";
import {  Card, Row, Col, Typography, Button } from "antd";

import Filter from "../Containers/Filter";
import PieChart from "../Containers/PieChart";
import BarChart from "../Containers/BarChart";
import List from "../Containers/List";

const PaymentsPage = props => (
  <div>
    <Row gutter={24} type="flex" justify="space-between">
      <Col span={4}></Col>
      <Col span={16} style={{ minWidth: 540 }}>
        <Card>
          <Row gutter={24} type="flex" justify="space-between" align="middle">
            <Col>
              <Typography.Title style={{ marginBottom: 0 }}>
                Платежи
              </Typography.Title>
            </Col>

            <Col>
              <Filter />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={4}></Col>
    </Row>
    <Row gutter={24} style={{ marginTop: 30 }}>
      <Col span={4}></Col>
      <Col span={16}>
        <Card title="Гистограмма доходов">
          <div style={{ margin: "auto", width: "fit-content" }}>
            <BarChart />
          </div>
        </Card>
      </Col>
      <Col span={4}></Col>
    </Row>

    <Row gutter={24} style={{ marginTop: 30 }}>
      <Col span={4}></Col>
      <Col span={8}>
        <Card title="Аналитика доходов">
          <div style={{ margin: "auto", width: "fit-content" }}>
            <PieChart paymentType="income" />
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Аналитика расходов">
          <div style={{ margin: "auto", width: "fit-content" }}>
            <PieChart paymentType="outcome" />
          </div>
        </Card>
      </Col>
      <Col span={4}></Col>
    </Row>

    <Row gutter={24} style={{ marginTop: 30 }}>
      <Col span={4}></Col>
      <Col span={16}>
        <Card
          title="Платежи"
          extra={<Button onClick={props.handleCreate}>Создать</Button>}
        >
          <div style={{ margin: "auto" }}>
            <List />
          </div>
        </Card>
      </Col>
      <Col span={4}></Col>
    </Row>
  </div>
);

export default PaymentsPage;
