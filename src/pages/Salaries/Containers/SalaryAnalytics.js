import { compose, withProps, lifecycle, withHandlers } from "recompose";
import { connect } from "react-redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { get, groupBy } from "lodash";

import { programDateFormat, getFullName } from "../../../services/formatters";
import { colors } from "../../../services/constants";
import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import SalariesAnalytics from "../Components/SalaryAnalytics";
import { splitRange } from "../../../services/chartUtils";

const mapState = state => ({
  users: selectors.getUsers(state),
  salaries: selectors.getSalaries(state),
  getUserById: selectors.getUserById(state),
  state
});

const mapDispatch = {
  readUsers: actions.usersRequest,
  readSalaries: actions.salariesRequest
};

const SalariesAnalyticsContainer = compose(
  Authenticated,
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ users, salaries, location, getUserById }) => {
    const values = qs.parse(location.search, { ignoreQueryPrefix: true });

    const range = splitRange(values.dateFrom, values.dateTo, "month");

    const groupedSalaries = groupBy(salaries, salary =>
      moment(salary.date)
        .startOf("month")
        .format(programDateFormat)
    );

    const res = Object.keys(range)
      .reverse()
      .reduce((acc, date) => {
        const salaries = groupedSalaries[date];
        acc[date] = { date };

        if (Array.isArray(salaries)) {
          salaries.forEach(salary => {
            const userName = getFullName(getUserById(salary.uuid));

            acc[date][userName] = salary.value;
          });
        }

        return acc;
      }, {});

    const chartData = Object.values(res);

    const usersLines = values.uuid ? values.uuid : [];

    const chartLines = usersLines.map((userId, i) => ({
      dataKey: getFullName(getUserById(userId)),
      type: "stepAfter",
      stroke: colors[i]
    }));

    return {
      values,
      chartData,
      chartLines
    };
  }),
  withHandlers({
    buildQuery: ({ location, state }) => () => {
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });

      let dateFrom = moment()
        .startOf("month")
        .subtract(6, "month")
        .format(programDateFormat);
      if (
        params.dateFrom &&
        moment(params.dateFrom, programDateFormat).isValid()
      ) {
        dateFrom = params.dateFrom;
      }

      let dateTo = moment()
        .startOf("month")
        .add(6, "month")
        .format(programDateFormat);
      if (params.dateTo && moment(params.dateTo, programDateFormat).isValid()) {
        dateTo = params.dateTo;
      }

      const userUUID = get(state, "authorization.user.uuid");
      let uuid = [userUUID];
      if (params.uuid && Array.isArray(params.uuid)) {
        uuid = params.uuid;
      }

      return qs.stringify({
        dateFrom,
        dateTo,
        uuid
      });
    }
  }),
  lifecycle({
    componentDidMount() {
      const {
        readUsers,
        readSalaries,
        buildQuery,
        history,
        location
      } = this.props;

      const query = buildQuery();

      history.push({
        pathname: location.pathname,
        search: query
      });

      readUsers();
      readSalaries({ search: `?${query}` });
    }
  })
)(SalariesAnalytics);

export default SalariesAnalyticsContainer;
