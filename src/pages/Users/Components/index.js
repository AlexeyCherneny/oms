import React from "react";
import { Row, Card, Layout, Col, Button } from "antd";
import { NavLink } from "react-router-dom";

import UsersTable from "../Containers/UsersTable";
import { BASE_URL, allowedRoles } from "../constants";

const Users = ({ role }) => (
  <Layout style={{ maxWidth: 1024, margin: "auto" }}>
    <Card style={{ minHeight: 640 }}>
      <Row gutter={12} type="flex" justify="end" style={{ marginBottom: 20, minHeight: 32 }}>
        {allowedRoles.includes(role) && (
          <>
            <Col>
              <NavLink to={`${BASE_URL}/plan`}>
                <Button icon="usergroup-add">
                  Планировать численность
            </Button>
              </NavLink>
            </Col>
            <Col>
              <NavLink to={`${BASE_URL}/invite`}>
                <Button icon="user-add" type="primary">
                  Пригласить участника
            </Button>
              </NavLink>
            </Col>
          </>
        )}
      </Row>

      <UsersTable />
    </Card>
  </Layout>
);

export default Users;
