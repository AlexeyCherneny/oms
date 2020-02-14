import React from "react";
import { Menu, Spin } from "antd";
import { NavLink } from "react-router-dom";

import styles from "./styles/projectsList.module.scss";
import { ListHeader } from "../../../Components";

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
    <div>
      <ListHeader
        title="Сотрудники"
        // handleCreate={handleCreate}
        // handleUpdate={readProjects}
      />
      <Menu
        {...menuProps}
        selectedKeys={[selectedKey]}
        style={{ marginBottom: 0 }}
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
    </div>
  );
};

export default Header;
