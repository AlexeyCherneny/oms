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
  user ? `${user.first_name || ""} ${user.last_name || ""}` : "";

const ProjectUsersListContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match, tabs, getProjectById, getUserById }) => {
    const projectId = get(match, "params.id");
    const project = getProjectById(projectId);

    const userId = get(match, "params.userId");
    const documentId = get(match, "params.documentId");

    const userTabs = get(project, "users", []).map(userId => ({
      title: getFullName(getUserById(userId)),
      id: userId,
      path: `${BASE_URL}/${documentId}/users/${userId}`
    }));

    return {
      selectedKey: userId,
      tabs: userTabs
    };
  })
)(ProjectUsersList);

export default ProjectUsersListContainer;
