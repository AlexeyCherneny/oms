import { compose, withProps, lifecycle, withHandlers } from "recompose";
import { connect } from "react-redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import moment from "moment";

import {
  // displayDateFormat,
  programDateFormat
} from "../../../services/formatters";
import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import Salaries from "../Components";
import { matchEntities, mergeObjects } from "../../../services/chartUtils";

const mapState = state => ({
  users: selectors.getUsers(state),
  salaries: selectors.getSalaries(state)
});

const mapDispatch = {
  readUsers: actions.usersRequest,
  readSalaries: actions.salariesRequest
};

const getFullName = user => `${user.first_name} ${user.last_name}`;

const SalariesContainer = compose(
  Authenticated,
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ users, salaries, history, location }) => {
    const values = qs.parse(location.search, { ignoreQueryPrefix: true });

    const filteredUsers = users.filter(
      user => values.users && values.users.includes(String(user.uuid))
    );

    const chartLines = filteredUsers.map(user => ({
      dataKey: getFullName(user),
      type: "stepAfter",
      stroke: "#8331d8"
    }));

    const usersMatchSalaries = matchEntities(
      filteredUsers,
      salaries,
      (user, salary) => user.uuid === salary.userId,
      (user, salary) => ({
        [`${getFullName(user)}`]: salary.value,
        date: salary.date
      })
    );

    const chartData = mergeObjects(usersMatchSalaries);

    return {
      values,
      chartData,
      chartLines,
      handleCreate: () => history.push(`salaries/create`)
    };
  }),
  withHandlers({
    buildQuery: ({ location }) => () => {
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });

      let startDate = moment()
        .startOf("month")
        .subtract(6, "month")
        .format(programDateFormat);
      if (
        params.startDate &&
        moment(params.startDate, programDateFormat).isValid()
      ) {
        startDate = params.startDate;
      }

      let endDate = moment()
        .startOf("month")
        .add(6, "month")
        .format(programDateFormat);
      if (
        params.endDate &&
        moment(params.endDate, programDateFormat).isValid()
      ) {
        endDate = params.endDate;
      }

      let users = [];
      if (params.users && Array.isArray(params.users)) {
        users = params.users;
      }

      return qs.stringify({
        startDate,
        endDate,
        users
      });
    }
  }),
  lifecycle({
    componentDidMount() {
      const { readUsers, readSalaries, buildQuery, history } = this.props;

      const query = buildQuery();

      history.push({
        pathname: "salaries",
        search: query
      });

      readUsers();
      readSalaries({ search: `?${query}` });
    }
  })
)(Salaries);

export default SalariesContainer;
