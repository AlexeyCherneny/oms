import React from "react";
import { Row, Card, Layout, Col, Button, Typography } from "antd";
import { NavLink } from 'react-router-dom';

import PlanTable from "../Containers/PlanTable";
import PlanForm from "../Containers/PlanForm";

const { Title } = Typography;

const UsersPlan = () => (
  <Layout style={{ maxWidth: 1024, margin: "auto" }}>
    <Card style={{ minHeight: 640 }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 0 }}>
        Планирование численности сотрудников
      </Title>
      <Row type="flex" justify="space-between" style={{ marginBottom: '1rem' }}>
        <Col>
          <NavLink to="/app/cabinet/users?role=employees">
            <Button
              type="link"
              icon="left"
            >
              Назад к сотрудникам
            </Button>
          </NavLink>
        </Col>
        <Col>
          <NavLink to="/app/cabinet/users/plan/new">
            <Button 
              type="primary"
              icon="edit"
            >
              Планировать
            </Button>
          </NavLink>
        </Col>
      </Row>
      <PlanTable />
      <PlanForm />
    </Card>
  </Layout>
);

export default UsersPlan;
