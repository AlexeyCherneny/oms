import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, withProps } from "recompose";
import { get } from "lodash";

import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import SalariesHeader from "../Components/SalariesHeader";

import { ROLES } from "../../../services/constants";
import { BASE_URL } from "../constants";

const mapState = state => ({
  salaries: selectors.getSalaries(state),
  isDownloading: selectors.isSalariesDownloading(state),
  isSalaryDeleting: selectors.isSalaryDeleting(state),
  isSalaryUpdating: selectors.isSalaryUpdating(state),
  getUserById: selectors.getUserById(state)
});

const mapDispatch = {
  handleSalaryDelete: actions.deleteSalaryRequest
};

const tabs = [
  {
    title: "Главная",
    pathname: `${BASE_URL}`,
    icon: "home",
    cleanSearch: false,
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  },
  {
    title: "Аналитика",
    pathname: `${BASE_URL}/analytics`,
    icon: "home",
    forRoles: [ROLES.HR, ROLES.EMPLOYEE]
  }
];

const SalariesHeaderContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ location }) => {
    const activeTab = tabs
      .concat()
      .reverse()
      .find(tab => location.pathname.includes(tab.pathname));

    return { tabs, selectedKey: get(activeTab, "pathname", "") };
  })
)(SalariesHeader);

export default SalariesHeaderContainer;
