import { connect } from "react-redux";
import { compose, lifecycle, withProps, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

import ProjectWorksList from "../Components/ProjectWorksTable";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

const mapState = state => ({
  projectWorks: selectors.getProjectWorks(state),
  getUserById: selectors.getUserById(state),
  getProjectWorkById: selectors.getProjectWorkById(state),
  isLoading: selectors.isProjectWorksDownloading(state),
  isDownloading: selectors.isProjectWorksDownloading(state),
  isProjectWorkUpdating: selectors.isProjectWorkUpdating(state),
  projectRates: selectors.getProjectRates(state)
});

const mapDispatch = {
  readProjectWorks: actions.projectWorksRequest,
  createProjectWork: actions.createProjectWorksRequest,
  openModal: actions.openModal
};

const ProjectWorksListContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  lifecycle({
    componentDidMount() {
      const { readProjectWorks } = this.props;

      readProjectWorks();
    }
  }),
  withProps(({ projectWorks, getUserById, projectRates }) => {
    const tableData = projectWorks.map(projectWork => {
      const user = getUserById(projectWork.userId);

      const workRate = projectRates.find(
        projectRate => projectRate.userId === projectWork.userId
      );
      const workAmount = workRate && workRate.workRate * projectWork.workHours;

      const overtimeRate = projectRates.find(
        projectRate => projectRate.userId === projectWork.userId
      );
      const overtimeAmount =
        overtimeRate && overtimeRate.overtimeRate * projectWork.overtimeHours;

      return {
        ...projectWork,
        workAmount,
        overtimeAmount,
        fullName: `${user.last_name} ${user.first_name}`
      };
    });

    return {
      tableData
    };
  }),
  withHandlers({
    handleProjectWorkEdit: ({
      openModal,
      getProjectWorkById
    }) => projectWorkId => {
      const projectWork = getProjectWorkById(projectWorkId);

      return openModal({
        form: {
          initialValues: projectWork,
          submitTitle: "Обновить",
          rejectTitle: "Отменить"
        },
        type: "projectWork",
        meta: {
          start: params =>
            actions.updateProjectWorkRequest({
              id: projectWorkId,
              params
            }),
          success: () => actions.updateProjectWorkSuccess(),
          failure: () => actions.updateProjectWorkFailure()
        }
      });
    }
  })
)(ProjectWorksList);

export default ProjectWorksListContainer;
