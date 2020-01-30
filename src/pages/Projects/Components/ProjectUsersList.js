import React from "react";
import { Menu, Spin } from "antd";
import { NavLink } from "react-router-dom";

import styles from "./styles/projectsList.module.scss";

const menuProps = {
  theme: "light",
  mode: "inline",
  style: {
    marginBottom: 20
  }
};

const Header = ({ selectedKey, tabs, isLoading }) => {
  if (isLoading) {
    return <Spin className={styles.contentSpinner} />;
  }

  return (
    <Menu {...menuProps} selectedKeys={[selectedKey]}>
      {tabs.map(tab => (
        <Menu.Item
          key={tab.id}
          className={styles.menuItem}
          style={{
            lineHeight: "40px",
            margin: 0,
            height: 60,
            display: "flex",
            alignItems: "center"
          }}
        >
          <NavLink to={tab.path}>{tab.title}</NavLink>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Header;
