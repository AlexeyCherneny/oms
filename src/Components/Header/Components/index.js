import React from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import { NavLink } from "react-router-dom";

import PermissionTab from "../Containers/PermissionTab";
import UserTab from "../Containers/UserTab";

import * as styles from './styles/index.module.scss';

const menuProps = {
  theme: 'dark',
  mode: 'inline',
  style: { 
    marginBottom: 20 
  },
}

const Header = ({
  isMenuCollapsed,
  handleMenuCollapse,
  activeTab,
  tabs,
}) => (
  <Layout.Sider
    collapsible
    collapsed={isMenuCollapsed}
    onCollapse={handleMenuCollapse}
    width={300}
  >
    <div className={styles.menuContainer}>
      <UserTab menuProps={menuProps} />
      <Menu {...menuProps} selectedKeys={[activeTab]} >
        {tabs.map(tab => (
          <Menu.Item key={tab.path} style={{ lineHeight: '40px' }}>
            <NavLink to={tab.path}>
              <Icon type={tab.icon} style={{ fontSize: '1.2em' }} />
              <span>{tab.title}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
      {!isMenuCollapsed && (
        <div className={styles.permissionBox}>
          <PermissionTab />
        </div>
      )}
    </div>
  </Layout.Sider>
);

export default Header;
