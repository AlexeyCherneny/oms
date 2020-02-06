import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

import ProjectsList from "../Containers/ProjectsList";
import Project from "../Containers/Project";

const TreeView = ({ indexPath }) => (
  <Layout style={{ height: "100%", maxWidth: 1280, margin: "auto" }}>
    <Layout.Sider width={300} theme="light" style={{ marginRight: 30 }}>
      <Route path={`${indexPath}/:projectId?`} >
        <ProjectsList indexPath={indexPath} />
      </Route>
    </Layout.Sider>
    <Layout.Content>
      <Route path={`${indexPath}/:projectId`} component={Project} />
    </Layout.Content>
  </Layout>
);

export default TreeView;
