import React from "react";
import { Menu, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

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
    <Scrollbars style={{ height: 300 }} renderThumbVertical={() => <div></div>}>
      <Menu
        {...menuProps}
        selectedKeys={[selectedKey]}
        style={{ marginBottom: 0, scrollbarWidth: "none" }}
      >
        {tabs.map(tab => (
          <Menu.Item
            key={tab.uuid}
            className={styles.menuItem}
            style={{
              lineHeight: "40px",
              margin: 0,
              height: 60,
              display: "flex",
              alignItems: "center"
            }}
          >
            <NavLink to={tab.to}>{tab.title}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Scrollbars>
  );
};

export default Header;
