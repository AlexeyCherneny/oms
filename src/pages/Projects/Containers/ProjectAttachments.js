import { connect } from "react-redux";
import { compose, withHandlers, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import ProjectAttachments from "../Components/ProjectAttachments";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

const mapState = state => ({
  projects: selectors.getProjects(state),
  getProjectById: selectors.getProjectById(state),
  isLoading: selectors.isProjectsDownloading(state)
});

const mapDispatch = {
  readProjects: actions.projectsRequest,
  updateProject: actions.updateProjectRequest
};

const ProjectAttachmentsContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ getProjectById, match }) => {
    const projectId = match.params.projectId;
    const project = getProjectById(projectId);

    const attachments = get(project, "attachments", []);

    return { project, attachments, projectId };
  }),
  withHandlers({
    handleUpload: ({ updateProject, projectId }) => file => {
      updateProject({ id: projectId, params: { attachments: file } });
    }
  })
)(ProjectAttachments);

export default ProjectAttachmentsContainer;
