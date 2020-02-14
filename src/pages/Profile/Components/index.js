import React from "react";
import { Layout, Card } from "antd";

import UserForm from "../../../Components/Forms/User/index.js";

const ProfilePage = props => (
  <Layout>
    <Card bodyStyle={{ margin: "auto", maxWidth: 450 }}>
      <UserForm {...props} />
    </Card>
  </Layout>
);

export default ProfilePage;
