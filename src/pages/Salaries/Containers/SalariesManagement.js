import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import qs from "qs";
import moment from "moment";

import { BASE_URL } from "../constants";
import SalariesManagement from "../Components/SalariesManagement";
import actions from "../../../store/actions";
import { programDateFormat } from "../../../services/formatters";
import selectors from "../../../store/selectors";

const mapState = state => ({
  projects: selectors.getProjects(state),
  getProjectById: selectors.getProjectById(state),
  isLoading: selectors.isProjectsDownloading(state),
  salaries: selectors.getSalaries(state),
  users: selectors.getUsers(state)
});

const mapDispatch = {
  readSalaries: actions.salariesRequest,
  openModal: actions.openModal,
  resetSalaries: actions.resetSalaries
};

const SalariesManagementContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),

  withHandlers({
    handleCreate: ({ openModal, match, salaries }) => () => {
      const userId = get(match, "params.userId");

      const defaultValue = get(salaries, `[${salaries.length - 1}].value`, "");

      const initialValues = {
        user: userId,
        dateFrom: moment().format(programDateFormat),
        dateTo: moment().format(programDateFormat),
        value: defaultValue
      };

      return openModal({
        form: {
          initialValues,
          submitTitle: "Создать",
          rejectTitle: "Отменить"
        },
        type: "customSalary",
        meta: {
          start: params => actions.createSalaryRangeRequest(params),
          success: () => actions.createSalaryRangeSuccess(),
          failure: () => actions.createSalaryRangeFailure()
        }
      });
    },
    initializeRoute: ({ history, users, match }) => () => {
      const userId = get(match, "params.userId");

      if (!userId) {
        const defaultUserId = get(users, "[0].uuid", "");
        if (defaultUserId) {
          history.replace(`${BASE_URL}/${defaultUserId}`);
        }
      }
    }
  }),

  lifecycle({
    componentDidMount() {
      const { initializeRoute, readSalaries } = this.props;
      initializeRoute();

      const currUserId = get(this.props, "match.params.userId");
      if (currUserId) {
        const query = qs.stringify({ uuid: [currUserId] }, { encode: false });
        readSalaries({ search: `?${query}` });
      }
    },
    componentDidUpdate(prevProps) {
      const { readSalaries, resetSalaries, initializeRoute } = this.props;
      initializeRoute();

      const currUserId = get(this.props, "match.params.userId");
      const prevUserId = get(prevProps, "match.params.userId");

      if (prevUserId !== currUserId && currUserId) {
        const query = qs.stringify({ uuid: [currUserId] }, { encode: false });

        resetSalaries();
        readSalaries({ search: `?${query}` });
      }
    }
  })
)(SalariesManagement);

export default SalariesManagementContainer;
