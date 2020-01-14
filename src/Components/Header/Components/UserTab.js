import React from "react";
import { Menu, Avatar, Dropdown } from "antd";

const UserTab = props => (
  <Dropdown
    overlay={
      <Menu theme="dark" style={{ lineHeight: "64px" }}>
        <Menu.Item onClick={props.logout}>Выйти</Menu.Item>
      </Menu>
    }
  >
    <div>
      <Avatar size="large" /> &nbsp;&nbsp;
      <span style={{ color: "white" }}>{props.fullName}</span>
    </div>
  </Dropdown>
);

export default UserTab;
