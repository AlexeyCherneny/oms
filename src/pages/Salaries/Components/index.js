import React from "react";
import { Layout } from "antd";

import SalariesHeader from "../Containers/SalariesHeader";

const SalariesPage = props => {
  return (
    <Layout style={{ height: "100%", maxWidth: 1280, margin: "auto" }}>
      <Layout.Header
        style={{ marginBottom: 20, backgroundColor: "white", padding: 0 }}
      >
        <SalariesHeader />
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
    </Layout>
  );
};

export default SalariesPage;
