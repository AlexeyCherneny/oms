import { connect } from "react-redux";
import { compose, withProps, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";

import ProjectWorksList from "../Components/ProjectWorksTable";
import { MODAL_TYPES } from "../../../Components/Modal/Components";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { formatCurrency, getFullName } from "../../../services/formatters";

const mapState = state => ({
  projectWorks: selectors.getProjectWorks(state),
  getUserByUuid: selectors.getUserByUuid(state),
  getProjectWorkByUuid: selectors.getProjectWorkByUuid(state),
  isLoading: selectors.isProjectWorksDownloading(state),
  isDownloading: selectors.isProjectWorksDownloading(state),
  isProjectsDownloading: selectors.isProjectsDownloading(state),
  isProjectWorkUpdating: selectors.isProjectWorkUpdating(state),
});

const mapDispatch = {
  openModal: actions.openModal
};

const ProjectWorksListContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  
  withProps(({ projectWorks, getUserByUuid, isDownloading, isProjectsDownloading }) => {
    const tableData = projectWorks.map(work => {
      const user = getUserByUuid(work.userUuid);
      const workAmount = (work.workHours || 0) * (work.workRate || 0);
      const overtimeAmount = (work.overtimeHours || 0) * (work.overtimeRate || 0);
      const totalAmount = workAmount + overtimeAmount;
      const currency = work.currency || '';

      return {
        ...work,
        workAmount: formatCurrency(workAmount, currency),
        overtimeAmount: formatCurrency(overtimeAmount, currency),
        totalAmount: formatCurrency(totalAmount, currency),
        fullName: getFullName(user),
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
      getProjectWorkByUuid
    }) => ({ uuid }) => {
      const projectWork = getProjectWorkByUuid(uuid);

      return openModal({
        form: {
          initialValues: projectWork,
          submitTitle: "Обновить",
          rejectTitle: "Отменить"
        },
        title: "Информация об отработанном времени",
        type: MODAL_TYPES.projectWork,
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
    },
    handleDelete: ({ openModal, getUserByUuid }) => work => openModal({
      type: "confirm",
      title: `Удалить сотрудника`,
      content: `Вы действительно желаете удалить сотрудника ${getFullName(getUserByUuid(work.userUuid))} из проекта?`,
      cancelText: "Отменить",
      okText: "Удалить",
      meta: {
        start: () => actions.deleteProjectWorkRequest(work.uuid, { data: work }),
        success: () => actions.deleteProjectWorkSuccess(),
        failure: () => actions.deleteProjectWorkFailure(),
      }
    })
  })
)(ProjectWorksList);

export default ProjectWorksListContainer;
