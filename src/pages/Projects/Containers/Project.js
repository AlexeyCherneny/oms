import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import moment from "moment";
import qs from "qs";

import Project from "../Components/Project";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import { programDateFormat } from "../../../services/formatters";

const mapState = state => ({
  getProjectById: selectors.getProjectById(state),
  getUserById: selectors.getUserById(state),
  users: selectors.getUsers(state)
});

const mapDispatch = {
  readProjectRates: actions.projectRatesRequest
};

const getFullName = user =>
  user ? `${user.firstName || ""} ${user.lastName || ""}` : "";

const ProjectContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match, getProjectById, getUserById }) => {
    const projectId = get(match, "params.projectId");
    const project = getProjectById(projectId);

    const title = get(project, "title", "");
    const attachments = get(project, "attachments", []);

    const usersTabs = get(project, "users", []).map(userId => {
      return {
        title: getFullName(getUserById(userId)),
        id: userId
      };
    });

    return {
      title,
      attachments,
      usersTabs,
      project
    };
  }),
  withHandlers({
    buildQuery: ({ location }) => () => {
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });

      let date = moment()
        .startOf("month")
        .format(programDateFormat);
      if (params.date && moment(params.date, programDateFormat).isValid()) {
        date = moment(params.date, programDateFormat).format(programDateFormat);
      }

      return qs.stringify({ date });
    }
  }),
  lifecycle({
    componentDidMount() {
      const { history, buildQuery, location } = this.props;

      const query = buildQuery();
      history.push({
        pathname: location.pathname,
        search: query
      });
    },
    componentDidUpdate(prevProps) {
      const { readProjectRates, buildQuery } = this.props;

      const currProjectId = get(this.props, "match.params.projectId");
      const prevProjectId = get(prevProps, "match.params.projectId");

      const currProject = get(this.props, "project");
      const prevProject = get(prevProps, "project");

      const currSearch = get(this.props, "location.search");
      const prevSearch = get(prevProps, "location.search");

      if (
        (!prevProject && currProject) ||
        (currProject &&
          (prevProjectId !== currProjectId || prevSearch !== currSearch))
      ) {
        const searchObj = qs.parse(buildQuery(), { ignoreQueryPrefix: true });
        const search =
          "?" + qs.stringify({ users: currProject.users, ...searchObj });

        if (currProject && currSearch) {
          readProjectRates({ search });
        }
      }
    }
  })
)(Project);

export default ProjectContainer;
