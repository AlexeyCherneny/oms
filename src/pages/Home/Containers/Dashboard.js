import { compose } from "recompose";
import { connect } from "react-redux";

import Dashboard from "../Components/Dashboard";
import selectors from "../../../store/selectors";

const mapState = ({ authorization, events, ...state }) => ({
  roles: authorization.user?.roles || [],
  salary: authorization.user && authorization.user.salary,
  currentSalary: 900,
  nextSalary: 1200,
  nextSalaryDate: "2020-02-01",
  dayoff: 2,
  vacation: 17,
  events:
    (events.eventsList &&
      Array.isArray(events.eventsList.data) &&
      events.eventsList.data.slice(0, 3)) ||
    [],
  employees: selectors.getUsers(state).length,
  plannedEmployees: 40,
  isPrivate:
    authorization.publicAccess && authorization.publicAccess.data !== undefined
      ? !authorization.publicAccess.data
      : true
});

const DashboardContainer = compose(connect(mapState, null))(Dashboard);

export default DashboardContainer;
