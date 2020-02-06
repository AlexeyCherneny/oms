import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../constants";

import ProjectUsersList from "../Components/ProjectUsersList";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

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

const getFullName = user =>
  user ? `${user.firstName || ""} ${user.lastName || ""}` : "";

const ProjectUsersListContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match, location, getProjectById, getUserById }) => {
    const projectId = get(match, "params.projectId");
    const project = getProjectById(projectId);

    const userId = get(match, "params.userId");

    const userTabs = get(project, "users", []).map(userId => ({
      title: getFullName(getUserById(userId)),
      id: userId,
      to: {
        pathname: `${BASE_URL}/${projectId}/users/${userId}`,
        search: location.search
      }
    }));

    return {
      selectedKey: userId,
      tabs: userTabs
    };
  })
)(ProjectUsersList);

export default ProjectUsersListContainer;
