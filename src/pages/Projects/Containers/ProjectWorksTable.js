import { connect } from "react-redux";
import { compose, withProps, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

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
  isProjectsDownloading: selectors.isProjectsDownloading(state),
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
  
  withProps(({ projectWorks, getUserById, isDownloading, isProjectsDownloading }) => {
    const tableData = projectWorks.map(work => {
      const user = getUserById(work.user_id);
      const workAmount = (work.work_hours || 0) * (work.work_rate || 0);
      const overtimeAmount = (work.overtime_hours || 0) * (work.overtime_rate || 0);
      const totalAmount = workAmount + overtimeAmount;
      const currency = work.currency || '';

      return {
        ...work,
        workAmount: formatCurrency(workAmount, currency),
        overtimeAmount: formatCurrency(overtimeAmount, currency),
        totalAmount: formatCurrency(totalAmount, currency),
        fullName: `${user?.last_name} ${user?.first_name}`
      };
    });

    return {
      tableData,
      isLoadingData: isProjectsDownloading || isDownloading,
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
        title: "Информация об отработанном времени",
        type: "projectWork",
        meta: {
          start: params =>
            actions.updateProjectWorkRequest({
              ...projectWork,
              ...params
            }),
          success: () => actions.updateProjectWorkSuccess(),
          failure: () => actions.updateProjectWorkFailure()
        }
      });
    }
  })
)(ProjectWorksList);

export default ProjectWorksListContainer;
