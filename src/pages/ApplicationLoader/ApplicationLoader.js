import React from "react";
import { Row, Col, Spin } from "antd";

const ApplicationLoader = props => (
  <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
    <Col span={2}>
      <Spin size="large" tip="Загрузка данных" />
    </Col>
  </Row>
);

export default ApplicationLoader;
