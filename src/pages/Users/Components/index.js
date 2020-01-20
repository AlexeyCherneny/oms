import React from "react";
import { Row, Card, Layout, Col, Button } from "antd";
import { NavLink } from "react-router-dom";

import UsersTable from "../Containers/UsersTable";
import { BASE_URL, allowedRoles } from "../constants";
import { isPermitted } from "../../../services/formatters";
import { ROLES } from "../../../services/constants";

const Users = ({ roles }) => {
  const isHR = roles.includes(ROLES.HR);

  return (
    <Layout style={{ maxWidth: 1024, margin: "auto" }}>
      <Card>
        {/* {isPermitted(allowedRoles, roles) && ( */}
        <Row
          gutter={12}
          type="flex"
          justify="end"
          style={{ marginBottom: 20, minHeight: 32 }}
        >
          <>
            {/* <Col>
              <NavLink to={`${BASE_URL}/plan`}>
                <Button icon="usergroup-add">Планировать численность</Button>
              </NavLink>
            </Col> */}
            {isHR && (
              <Col>
                <NavLink to={`${BASE_URL}/create`}>
                  <Button icon="user-add" type="primary">
                    Добавить сотрудника
                  </Button>
                </NavLink>
              </Col>
            )}
          </>
        </Row>
        {/* )} */}

        <UsersTable />
      </Card>
    </Layout>
  );
};

export default Users;
