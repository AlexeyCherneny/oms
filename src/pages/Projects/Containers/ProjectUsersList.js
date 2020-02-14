import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../constants";

import ProjectUsersList from "../Components/ProjectUsersList";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { getFullName } from "../../../services/formatters";

const mapState = state => ({
  getProjectByUuid: selectors.getProjectByUuid(state),
  getUserByUuid: selectors.getUserByUuid(state),
  users: selectors.getUsers(state)
});

const mapDispatch = {
  // readProjects: actions.projectsRequest,
  createProject: actions.createProjectsRequest,
  openModal: actions.openModal
};

const ProjectUsersListContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match, location, getProjectByUuid, getUserByUuid }) => {
    const projectUuid = get(match, "params.projectUuid");
    const project = getProjectByUuid(projectUuid);

    const userUuid = get(match, "params.userUuid");

    const userTabs = get(project, "users", []).map(userUuid => ({
      title: getFullName(getUserByUuid(userUuid)),
      uuid: userUuid,
      to: {
        pathname: `${BASE_URL}/${projectUuid}/users/${userUuid}`,
        search: location.search
      }
    }));

    return {
      selectedKey: userUuid,
      tabs: userTabs
    };
  })
)(ProjectUsersList);

export default ProjectUsersListContainer;
