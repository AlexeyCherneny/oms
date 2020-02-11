import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

const menuProps = {
  theme: "light",
  mode: "horizontal"
};

const Header = ({ tabs, location, selectedKey }) => {
  return (
    <Menu {...menuProps} theme="light" selectedKeys={[selectedKey]}>
      {tabs.map(tab => (
        <Menu.Item key={tab.pathname} style={{ lineHeight: "64px" }}>
          <NavLink
            to={{
              pathname: tab.pathname,
              search: tab.cleanSearch ? location.search : ""
            }}
          >
            {tab.title}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Header;
