import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps } from "recompose";

import UserTab from "../Components/UserTab";
import actions from "../../../store/actions";

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
    fullName: `${get(user, "first_name", "")} ${get(user, "last_name", "")}`
  }))
)(UserTab);

export default UserTabContainer;
