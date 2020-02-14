import React from "react";
import { Menu, Avatar } from "antd";
import cn from 'classnames';

import * as styles from './styles/UserTab.module.scss';

const UserTab = ({ 
  isMenuCollapsed, 
  fullName, 
  handleLogout, 
  menuProps,
  user
}) => (
  <div className={cn(isMenuCollapsed && styles.containerCollapsed)}>
    <div className={styles.avatar}>
      <Avatar size={isMenuCollapsed ? 36 : 64} icon="user" src={user.photo} />
    </div>
    <Menu {...menuProps} >
      <Menu.SubMenu
        key='profile'
        title={(
          <span className={styles.menuItem}>{fullName}</span>
        )}
      >
        <Menu.Item
          key='profile_exit'
          onClick={handleLogout}
        >
          Выйти
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </div>
);

export default UserTab;
