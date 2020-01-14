import React from "react";
import { Layout, Card } from "antd";

import ProfileForm from "../../../Components/Forms/Profile";

const ProfilePage = props => (
  <Layout style={{ maxWidth: 1024, margin: "auto" }}>
    <Card style={{ minHeight: 640 }}>
      <ProfileForm
        handleSubmit={props.handleSubmit}
        initialValues={props.initialValues}
      />{" "}
    </Card>
  </Layout>
);

export default ProfilePage;
