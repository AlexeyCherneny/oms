import React from "react";
import { Layout } from "antd";

import ProjectUsersList from "../Containers/ProjectUsersList";

const ProjectUsers = props => {
  return (
    <Layout>
      <Layout.Sider theme="light" style={{ paddingRight: 30 }} width={300}>
        <ProjectUsersList />
      </Layout.Sider>

      <Layout.Content style={{ backgroundColor: "white" }}>
        {props.children}
      </Layout.Content>
    </Layout>
  );
};

export default ProjectUsers;
