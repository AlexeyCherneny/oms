import React from "react";
import { Layout, Row, Col, Button } from "antd";

import UsersList from "../Containers/UsersList";

const ProjectUsers = props => {
  return (
    <Layout>
      <Layout.Sider
        theme="light"
        style={{ marginRight: 30, height: 300 }}
        width={300}
      >
        <UsersList />
      </Layout.Sider>

      <Layout.Content style={{ backgroundColor: "white" }}>
        {props.children}

        <Row
          type="flex"
          justify="end"
          style={{ marginBottom: 16, marginTop: 16, marginRight: 10 }}
        >
          <Col>
            <Button onClick={props.handleCreate}>Создать</Button>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default ProjectUsers;
