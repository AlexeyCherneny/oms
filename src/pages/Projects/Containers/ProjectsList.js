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
      const initialValues = {
        title: 'Новый проект',
      }

      return openModal({
        form: {
          submitTitle: "Создать",
          rejectTitle: "Отменить",
          initialValues
        },
        title: "Создать новый проект",
        type: "project",
        meta: {
          start: params => actions.createProjectRequest({ ...initialValues, ...params }),
          success: () => actions.createProjectSuccess(),
          failure: () => actions.createProjectFailure()
        }
      });
    },
    handleDelete: ({ openModal, selectedKey, indexPath, history }) => project => openModal({
      type: "confirm",
      title: `Удалить проект ${project.title}`,
      content: "Вы действительно хотите выполнить это действие?",
      cancelText: "Отменить",
      okText: "Удалить",
      meta: {
        start: () => actions.deleteProjectRequest(project.uuid, {
          onSuccess: () => String(project.uuid) === selectedKey && history.push(indexPath)
        }),
        success: () => actions.deleteProjectSuccess(),
        failure: () => actions.deleteProjectFailure()
      }
    }),
    handleRename: ({ openModal }) => project => openModal({
      form: {
        initialValues: project,
        submitTitle: "Сохранить",
        rejectTitle: "Отменить"
      },
      title: `Редактирование проекта ${project.title}`,
      type: "project",
      meta: {
        start: params => actions.updateProjectRequest({ ...project, ...params }),
        success: () => actions.updateProjectSuccess(),
        failure: () => actions.updateProjectFailure()
      }
    }),
  })
)(ProjectsList);

export default ProjectsListContainer;
