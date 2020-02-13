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
      handleUserInfo: userUuid => history.push(`${BASE_URL}/${userUuid}/info`),
      handleUserEdit: userUuid => history.push(`${BASE_URL}/${userUuid}/edit`)
    };
  })
)(UsersTable);

export default UsersTableContainer;
