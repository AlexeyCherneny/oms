import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

import Header from "../Components";
import actions from "../../../store/actions";
import { url } from "../../../services/helpers";

import { ROLES } from "../../../services/constants";

const navigationTabs = [
  {
    title: "Главная",
    path: "/app/cabinet",
    icon: "home",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  {
    title: "Профиль",
    path: "/app/cabinet/profile",
    icon: "idcard",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  {
    title: "Сотрудники",
    path: "/app/cabinet/users",
    icon: "team",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  {
    title: "Зарплаты",
    path: "/app/cabinet/salaries",
    icon: "dollar",
    forRoles: [ROLES.HR]
  }
  // {
  //   title: "Мероприятия",
  //   path: "/app/cabinet/events",
  //   icon: "calendar",
  //   forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  // },
  // {
  //   title: "Финансы",
  //   path: "/app/cabinet/payments",
  //   forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  // },
  // {
  //   title: "Документы",
  //   path: "/app/cabinet/documents",
  //   icon: "snippets",
  //   forRoles: [ROLES.HR]
  // },
  // {
  //   title: "Проекты",
  //   path: "/app/cabinet/projects",
  //   icon: "project",
  //   forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  // }
];

const mapState = ({ authorization }) => ({
  roles: get(authorization, "user.roles", []),
  isMenuCollapsed: get(authorization, "settings.isMenuCollapsed", false)
});

const mapDispatch = {
  setUserSettings: actions.setUserSettings
};

const HeaderContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ roles, location }) => {
    const isTabAvailable = tab => {
      if (Array.isArray(tab.forRoles))
        return tab.forRoles.some(forRole =>
          roles.some(userRole => userRole === forRole)
        );

      return false;
    };
    const tabs = navigationTabs.filter(isTabAvailable);
    const activeTab = url.findPathInLocation(
      location.pathname,
      tabs.map(({ path }) => path)
    );
    return { activeTab, tabs };
  }),
  withHandlers({
    handleMenuCollapse: ({ isMenuCollapsed, setUserSettings }) => () =>
      setUserSettings({ isMenuCollapsed: !isMenuCollapsed })
  })
)(Header);

export default HeaderContainer;
