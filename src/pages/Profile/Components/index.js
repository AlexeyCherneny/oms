import React from "react";
import { Layout, Card } from "antd";

import UserForm from "../../../Components/Forms/User";

const ProfilePage = props => (
  <Layout style={{ maxWidth: 1024, margin: "auto" }}>
    <Card style={{ minHeight: 640 }}>
      <div style={{ margin: "auto", maxWidth: 450 }}>
        <UserForm
          handleSubmit={props.handleSubmit}
          initialValues={props.initialValues}
          submitTitle='Обновить'
        />
      </div>
    </Card>
  </Layout>
);

export default ProfilePage;
