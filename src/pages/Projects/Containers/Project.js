import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps, lifecycle, withHandlers, mapProps } from "recompose";
import { withRouter } from "react-router-dom";
import { isEqual, pickBy, pick } from "lodash";
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
  readProjectWorks: actions.projectWorksRequest,
};

const getFullName = user =>
  user ? `${user.firstName || ""} ${user.lastName || ""}` : "";

const ProjectContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match, location, getProjectById, getUserById }) => {
    const projectId = get(match, "params.projectId", '');
    const searchObj = qs.parse(location.search, { ignoreQueryPrefix: true });
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
      project,
      projectId,
      searchObj,
    };
  }),
  withHandlers({
    buildQuery: ({ searchObj }) => () => {
      const momentDate = moment(searchObj.date).isValid()
        ? moment(searchObj.date)
        : moment();
      const date = momentDate.startOf('month').format(programDateFormat);
      const newSeachObj = pickBy({ ...searchObj, date });

      return isEqual(searchObj, newSeachObj) ? null : newSeachObj;
    },
    updateQuery: ({ location, history, searchObj }) => (addQuery, skipSearch = false) => {
      const { pathname } = location;
      const newSeachObj = skipSearch ? { ...searchObj, ...addQuery } : addQuery;
      const search = qs.stringify(newSeachObj, { skipNulls: true });
      history.replace({ pathname, search });
    },
    readProjectWorks: ({ readProjectWorks, searchObj, projectId }) => () => {
      readProjectWorks({ projectId, search: searchObj });
    },
    handleAddUser: () => () => console.log('add user'),
  }),
  lifecycle({
    componentDidMount() {
      const { buildQuery, updateQuery, readProjectWorks } = this.props;
      const query = buildQuery();
      query ? updateQuery(query, true) : readProjectWorks();
    },
    
    componentDidUpdate(prevProps) {
      const { readProjectWorks, buildQuery, updateQuery, projectId, searchObj } = this.props;
      const isProjectChanged = projectId !== prevProps.projectId;
      const isSearchUpdated = !isEqual(searchObj, prevProps.searchObj);

      if (isProjectChanged || isSearchUpdated) {
        const query = buildQuery();
        query ? updateQuery(query, true) : readProjectWorks();
      }
    }
  }),
  mapProps(props => pick(props, [
    'children',
    'title',
    'project',
    'attachments',
    'updateQuery',
    'handleAddUser',
    'searchObj'
  ]))
)(Project);

export default ProjectContainer;
