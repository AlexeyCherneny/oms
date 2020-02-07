import React from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";

import TreeView from "../Containers/TreeView";
import DocumentArea from "../Containers/DocumentArea";

const DocumentsPage = ({ path, ...props }) => {
  return (
    <>
      <Layout style={{ height: '100%', maxWidth: 1280, margin: 'auto' }}>
        <Layout.Sider width={300} style={{ marginRight: 30 }}>
          <Route path={path + '/:id?'}>
            <TreeView {...props} />
          </Route>
        </Layout.Sider>
        <Layout.Content>
          <Route path={path + '/:id?/:operation?'}>
            <DocumentArea {...props}/>
          </Route>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default DocumentsPage;
