import React from "react";
import { Layout } from "antd";

import ProjectsList from "../Containers/ProjectsList";

const TreeView = ({ children }) => {
  return (
    <Layout style={{ height: "100%", maxWidth: 1280, margin: "auto" }}>
      <Layout.Sider width={300} theme="light" style={{ marginRight: 30 }}>
        <ProjectsList />
      </Layout.Sider>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default TreeView;
