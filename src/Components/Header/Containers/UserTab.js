import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps, withHandlers } from "recompose";

import UserTab from "../Components/UserTab";
import actions from "../../../store/actions";
import { getFullName } from "../../../services/formatters";

const mapState = ({ authorization }) => ({ 
  user: authorization.user,
  isMenuCollapsed: get(authorization, 'settings.isMenuCollapsed', false),
});

const mapDispatch = {
  logout: actions.logoutRequest
};

const UserTabContainer = compose(
  connect(mapState, mapDispatch),
  withProps(({ user }) => ({
    fullName: getFullName(user)
  })),
  withHandlers({
    handleLogout: ({ logout }) => ({ domEvent }) => {
      domEvent.persist();
      logout();
    }
  })
)(UserTab);

export default UserTabContainer;
