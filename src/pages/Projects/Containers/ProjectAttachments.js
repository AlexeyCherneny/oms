import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";

import ProjectAttachments from "../Components/ProjectAttachments";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

const mapState = state => ({
  isLoading: selectors.isProjectsDownloading(state),
  isProjectUpdating: selectors.isProjectUpdating(state),
});

const mapDispatch = {
  readProjects: actions.projectsRequest,
  updateProject: actions.updateProjectRequest
};

const ProjectAttachmentsContainer = compose(
  connect(mapState, mapDispatch),
  withHandlers({
    handleUpload: ({ updateProject, projectUuid }) => file => {
      updateProject({ uuid: projectUuid, params: { attachments: file } });
    }
  })
)(ProjectAttachments);

export default ProjectAttachmentsContainer;
