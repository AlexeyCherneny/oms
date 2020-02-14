import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import qs from "qs";
import { sortBy, merge } from "lodash";
import moment from "moment";

import { BASE_URL } from "../constants";
import SalariesManagement from "../Components/SalariesManagement";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { DATE_FORMATS } from "../../../services/constants";

const mapState = state => ({
  projects: selectors.getProjects(state),
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
      const userUuid = get(match, "params.userUuid");

      const sortedSalaries = sortBy(salaries, s => s.date);
      const lastSalary = get(sortedSalaries, `[${sortedSalaries.length - 1}]`);

      let initialValues = { userUuid };

      if (lastSalary) {
        const lastDate = moment(lastSalary.date, DATE_FORMATS.dashReverse);

        initialValues = merge(initialValues, {
          dateFrom: lastDate
            .clone()
            .add(1, "month")
            .format(DATE_FORMATS.dashReverse),
          dateTo: lastDate
            .clone()
            .add(1, "month")
            .format(DATE_FORMATS.dashReverse),
          value: lastSalary.value
        });
      } else {
        initialValues = merge(initialValues, {
          dateFrom: moment().format(DATE_FORMATS.dashReverse),
          dateTo: moment().format(DATE_FORMATS.dashReverse),
          value: 0
        });
      }

      return openModal({
        form: {
          initialValues,
          submitTitle: "Создать",
          rejectTitle: "Отменить"
        },
        type: "salaryRange",
        meta: {
          start: actions.createSalaryRangeRequest,
          failure: actions.createSalaryRangeFailure
        }
      });
    },
    initializeRoute: ({ history, users, match }) => () => {
      const userUuid = get(match, "params.userUuid");

      if (!userUuid) {
        const defaultUserUuid = get(users, "[0].uuid", "");
        if (defaultUserUuid) {
          history.replace(`${BASE_URL}/${defaultUserUuid}`);
        }
      }
    }
  }),

  lifecycle({
    componentDidMount() {
      const { initializeRoute, readSalaries } = this.props;
      initializeRoute();

      const currUserUuid = get(this.props, "match.params.userUuid");
      if (currUserUuid) {
        const query = qs.stringify({ uuid: [currUserUuid] }, { encode: false });
        readSalaries({ search: `?${query}` });
      }
    },
    componentDidUpdate(prevProps) {
      const { readSalaries, resetSalaries, initializeRoute } = this.props;
      initializeRoute();

      const currUserUuid = get(this.props, "match.params.userUuid");
      const prevUserUuid = get(prevProps, "match.params.userUuid");

      if (prevUserUuid !== currUserUuid && currUserUuid) {
        const query = qs.stringify({ uuid: [currUserUuid] }, { encode: false });

        resetSalaries();
        readSalaries({ search: `?${query}` });
      }
    }
  })
)(SalariesManagement);

export default SalariesManagementContainer;
