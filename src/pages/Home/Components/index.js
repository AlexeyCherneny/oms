import React from 'react';
import { Layout } from "antd";

import Dashboard from '../Containers/Dashboard';
// import Chart from '../Containers/Chart';
// import { ROLES } from '../../../services/constants';

const HomePage = props => {

  return (
    <Layout style={{ maxWidth: 1024, margin: "auto" }}>
      <Dashboard />
      {/* {props.role === ROLES.hr && (<Chart />)} */}
    </Layout>
  );
}

export default HomePage;
