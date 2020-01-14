import React from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

import PermissionTab from "../Containers/PermissionTab";
import UserTab from "../Containers/UserTab";

const navigationTabs = [
  {
    title: "Главная",
    path: "/app/cabinet/",
    availableRoles: ["hr", "employee"]
  },
  {
    title: "Профиль",
    path: "/app/cabinet/profile",
    availableRoles: ["hr", "employee"]
  },
  {
    title: "Сотрудники",
    path: "/app/cabinet/users?role=employees",
    availableRoles: ["hr"]
  },
  {
    title: "Зарплаты",
    path: "/app/cabinet/salaries",
    availableRoles: ["hr", "employee"]
  },
  {
    title: "Мероприятия",
    path: "/app/cabinet/events",
    availableRoles: ["hr", "employee"]
  },
  {
    title: "Финансы",
    path: "/app/cabinet/payments",
    availableRoles: ["hr", "employee"]
  },
  {
    title: "Документы",
    path: "/app/cabinet/documents",
    availableRoles: ["hr", "employee"]
  },
];

const Header = props => {
  const availableTabs = navigationTabs.filter(tab =>
    tab.availableRoles.includes(props.role)
  );

  return (
    <Layout.Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        {availableTabs.map(tab => (
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
