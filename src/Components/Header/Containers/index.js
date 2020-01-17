import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps } from "recompose";

import Header from "../Components";

import { ROLES } from "../../../services/constants";

const navigationTabs = [
  {
    title: "Главная",
    path: "/app/cabinet/",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  {
    title: "Профиль",
    path: "/app/cabinet/profile",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  {
    title: "Сотрудники",
    path: "/app/cabinet/users",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  {
    title: "Зарплаты",
    path: "/app/cabinet/salaries",
    forRoles: [ROLES.HR]
  },
  {
    title: "Мероприятия",
    path: "/app/cabinet/events",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  // {
  //   title: "Финансы",
  //   path: "/app/cabinet/payments",
  //   forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  // },
  // {
  //   title: "Документы",
  //   path: "/app/cabinet/documents",
  //   forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  // }
];

const mapState = ({ authorization }) => ({
  roles: get(authorization, "user.roles", [])
});

const HeaderContainer = compose(
  connect(mapState),
  withProps(({ roles }) => {
    const isTabAvailable = tab =>
      tab.forRoles.some(forRole =>
        roles.some(userRole => userRole === forRole)
      );

    const tabs = navigationTabs.filter(isTabAvailable);

    return { tabs };
  })
)(Header);

export default HeaderContainer;
