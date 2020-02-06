import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, withProps } from "recompose";
import { defaultTo, get } from "lodash";

import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import UsersTable from "../Components/UsersTable";
import { BASE_URL } from "../constants";

const mapState = state => ({
  accountRoles: get(state.authorization, "user.roles", []),
  users: selectors.getUsers(state),
  isDownloading: selectors.isUsersDownloading(state),
  isUserDeleting: selectors.isUserDeleting(state),
  isUserUpdating: selectors.isUserUpdating(state)
});

const mapDispatch = {
  handleUserDelete: actions.deleteUserRequest
};

const UsersTableContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ history, users }) => {
    const tableData = users.map(user => ({
      ...user,
      full_name: `${defaultTo(user.lastName, "")} ${defaultTo(
        user.firstName,
        ""
      )} ${defaultTo(user.middleName, "")}`
    }));

    return {
      tableData,
      handleUserInfo: user_id => history.push(`${BASE_URL}/${user_id}/info`),
      handleUserEdit: user_id => history.push(`${BASE_URL}/${user_id}/edit`)
    };
  })
)(UsersTable);

export default UsersTableContainer;
