import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

import PermissionTab from "../Containers/PermissionTab";
import UserTab from "../Containers/UserTab";

const Header = props => {
  return (
    <Layout.Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        {props.tabs.map(tab => (
          <Menu.Item key={tab.path}>
            <NavLink to={tab.path}>{tab.title}</NavLink>
          </Menu.Item>
        ))}
      </Menu>

      <div style={{ display: "flex" }}>
        <PermissionTab />
        <div style={{ width: 40 }}></div>
        <UserTab />
      </div>
    </Layout.Header>
  );
};

export default Header;
