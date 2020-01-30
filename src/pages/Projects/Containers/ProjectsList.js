import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

import ProjectsList from "../Components/ProjectsList";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

const mapState = state => ({
  projects: selectors.getProjects(state),
  getProjectById: selectors.getProjectById(state),
  isLoading: selectors.isProjectsDownloading(state)
});

const mapDispatch = {
  readProjects: actions.projectsRequest,
  createProject: actions.createProjectsRequest,
  openModal: actions.openModal
};

const ProjectsListContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match }) => {
    const selectedKey = get(match, "params.projectId");
    return {
      selectedKey
    };
  }),
  withHandlers({
    handleCreate: ({ openModal }) => () => {
      return openModal({
        form: {
          submitTitle: "Создать",
          rejectTitle: "Отменить"
        },
        type: "project",
        meta: {
          start: params => actions.createProjectRequest(params),
          success: () => actions.createProjectSuccess(),
          failure: () => actions.createProjectFailure()
        }
      });
    },
    handleDelete: ({ openModal, getProjectById }) => projectId => {
      const project = getProjectById(projectId);

      return openModal({
        type: "confirm",
        title: `Удалить проект ${project.title}`,
        content: "Вы действительно хотите выполнить это действие?",
        cancelText: "Отменить",
        okText: "Удалить",
        meta: {
          start: () =>
            actions.deleteProjectRequest({
              id: projectId
            }),
          success: () => actions.deleteProjectSuccess(),
          failure: () => actions.deleteProjectFailure()
        }
      });
    },
    handleRename: ({ openModal, getProjectById }) => projectId => {
      const project = getProjectById(projectId);

      return openModal({
        form: {
          initialValues: project,
          submitTitle: "Обновить",
          rejectTitle: "Отменить"
        },
        type: "project",
        meta: {
          start: params =>
            actions.updateProjectRequest({
              id: projectId,
              params
            }),
          success: () => actions.updateProjectSuccess(),
          failure: () => actions.updateProjectFailure()
        }
      });
    }
  })
)(ProjectsList);

export default ProjectsListContainer;
