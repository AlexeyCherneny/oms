import React from "react";
import { Layout } from "antd";

import ProjectUsersList from "../Containers/ProjectUsersList";
import ProjectUser from "../Containers/ProjectUser";

const ProjectUsers = () => {
  return (
    <Layout>
      <Layout.Sider width={250} theme="light" style={{ paddingRight: 30 }}>
        <ProjectUsersList />
      </Layout.Sider>

      <Layout.Content style={{ backgroundColor: "white" }}>
        <ProjectUser />
      </Layout.Content>
    </Layout>
  );
};

export default ProjectUsers;
