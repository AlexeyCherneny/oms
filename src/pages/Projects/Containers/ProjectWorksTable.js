import { connect } from "react-redux";
import { compose, lifecycle, withProps, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import ProjectWorksList from "../Components/ProjectWorksTable";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { formatCurrency } from "../../../services/formatters";

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

      const { userId, workHours, overtimeHours } = projectWork;

      const rate = projectRates.find(
        projectRate => projectRate.userId === userId
      );
      const currency = get(rate, "currency", "");

      const workAmount = rate && rate.workRate * workHours;
      const overtimeAmount = rate && rate.overtimeRate * overtimeHours;

      return {
        ...projectWork,
        workAmount: formatCurrency(workAmount, currency),
        overtimeAmount: formatCurrency(overtimeAmount, currency),
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
