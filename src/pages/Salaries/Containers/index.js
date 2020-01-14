import { compose, withProps, lifecycle } from "recompose";
import { connect } from "react-redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
// import moment from "moment";

import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import Salaries from "../Components";
import { matchEntities, mergeObjects } from "../../../services/chartUtils";

const mapState = state => ({
  usersList: state.users.data ? state.users.data : [],
  salaries: selectors.getSalaries(state)
});

const mapDispatch = {
  fetchUsers: actions.usersRequest,
  fetchSalaries: actions.salariesRequest
};

const getFullName = user => `${user.first_name} ${user.last_name}`;

const SalariesContainer = compose(
  Authenticated,
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ usersList, salaries, history, location }) => {
    const values = qs.parse(location.search, { ignoreQueryPrefix: true });

    let users = usersList;
    if (values.users && Array.isArray(usersList)) {
      users = usersList.filter(user => values.users.includes(String(user.id)));
    }

    const chartLines = users.map(user => ({
      dataKey: getFullName(user),
      type: "stepAfter",
      stroke: "#8331d8"
    }));

    // let startDate = moment()
    //   .startOf("month")
    //   .subtract(6, "month");
    // if (values.start_date) {
    //   startDate = moment(values.start_date).startOf("month");
    // }

    // let endDate = moment()
    //   .startOf("month")
    //   .add(6, "month");
    // if (values.end_date) {
    //   endDate = moment(values.end_date).startOf("month");
    // }

    const usersMatchSalaries = matchEntities(
      users,
      salaries,
      (user, salary) => user.id === salary.userId,
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
  lifecycle({
    componentDidMount() {
      const { fetchUsers, fetchSalaries } = this.props;

      fetchUsers();
      fetchSalaries();
    }
  })
)(Salaries);

export default SalariesContainer;
