import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../constants";

import UsersList from "../Components/UsersList";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { getFullName } from "../../../services/formatters"

const mapState = state => ({
  getProjectById: selectors.getProjectById(state),
  getUserById: selectors.getUserById(state),
  users: selectors.getUsers(state)
});

const mapDispatch = {
  // readProjects: actions.projectsRequest,
  createProject: actions.createProjectsRequest,
  openModal: actions.openModal
};

const UsersListContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match, location, users }) => {
    const userId = get(match, "params.userId");

    const userTabs = users.map(user => ({
      title: getFullName(user),
      id: user.uuid,
      to: {
        pathname: `${BASE_URL}/${user.uuid}`,
        search: location.search
      }
    }));

    return {
      selectedKey: userId,
      tabs: userTabs
    };
  })
)(UsersList);

export default UsersListContainer;