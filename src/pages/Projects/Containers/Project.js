import { connect } from "react-redux";
import { get } from "lodash";
import { compose, withProps, lifecycle, withHandlers, mapProps } from "recompose";
import { withRouter } from "react-router-dom";
import { isEqual, pickBy, pick } from "lodash";
import Moment from "moment";
import qs from "qs";

import Project from "../Components/Project";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { MODAL_TYPES } from "../../../Components/Modal/Components";
import { programDateFormat, getFullName } from "../../../services/formatters";

const mapState = state => ({
  projectWorks: selectors.getProjectWorks(state),
  isLoadingProject: selectors.isProjectsDownloading(state),
  getProjectByUuid: selectors.getProjectByUuid(state),
  getUserByUuid: selectors.getUserByUuid(state),
  users: selectors.getUsers(state)
});

const mapDispatch = {
  readProjectWorks: actions.projectWorksRequest,
  cleanProjectWork: actions.cleanProjectWork,
  openModal: actions.openModal,
};

const ProjectContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match, location, getProjectByUuid, getUserByUuid }) => {
    const projectUuid = get(match, "params.projectUuid", '');
    const searchObj = qs.parse(location.search, { ignoreQueryPrefix: true });
    const project = getProjectByUuid(projectUuid);

    const title = get(project, "title", "");
    const attachments = get(project, "attachments", []);

    const usersTabs = get(project, "users", []).map(userUuid => {
      return {
        title: getFullName(getUserByUuid(userUuid)),
        uuid: userUuid
      };
    });

    return {
      title,
      attachments,
      usersTabs,
      project,
      projectUuid,
      searchObj,
    };
  }),
  withHandlers({
    buildQuery: ({ searchObj }) => () => {
      const momentDate = Moment(searchObj.date).isValid()
        ? Moment(searchObj.date)
        : Moment();
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
    readProjectWorks: ({ readProjectWorks, cleanProjectWork, searchObj, project }) => () => {
      if (!project) return cleanProjectWork();
      readProjectWorks({ projectUuid: project.uuid, search: searchObj });
    },
    handleAddUser: ({ openModal, users, projectWorks, searchObj, project }) => () => openModal({
      form: {
        initialValues: {
          date: searchObj.date,
          projectUuid: project.uuid
        },
        users: users.filter(user => !projectWorks.find(work => work.userUuid === user.uuid)),
        submitTitle: "Добавить",
        rejectTitle: "Отменить"
      },
      title: "Добавить сотрудников",
      type: MODAL_TYPES.projectUser,
      meta: {
        start: params => actions.createProjectWorkRequest({ projectUuid: project.uuid, params }),
        success: () => actions.createProjectWorkSuccess(),
        failure: () => actions.createProjectWorkFailure()
      },
    })
  }),
  lifecycle({
    componentDidMount() {
      const { buildQuery, updateQuery, readProjectWorks } = this.props;
      const query = buildQuery();
      query ? updateQuery(query, true) : readProjectWorks();
    },
    
    componentDidUpdate(prevProps) {
      const { readProjectWorks, buildQuery, updateQuery, isLoadingProject, project, searchObj } = this.props;
      const isProjectChanged = !isEqual(project, prevProps.project) 
        || (prevProps.isLoadingProject && !isLoadingProject);
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
    'readProjectWorks',
    'searchObj'
  ]))
)(Project);

export default ProjectContainer;
