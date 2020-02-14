import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose';
import { connect } from "react-redux";

import ProjectsCard from '../Components/ProjectsCard';
import actions from "../../../store/actions";
import { stringifyDate } from '../../../services/formatters';
import selectors from '../../../store/selectors';

const mapState = state => ({
  isProjectsLoading: selectors.isProjectsDownloading(state),
  isWorkLoading: selectors.isProjectWorksDownloading(state),
  getIsWorkUpdating: selectors.isProjectWorkUpdating(state),
  projects: selectors.getProjects(state),
  projectWork: selectors.getProjectWorks(state),
  user: state.authorization.user,
});

const mapDispatch = {
  loadProjects: actions.projectsRequest,
  loadProjectWork: actions.projectWorksRequest,
  updateProjectWork: actions.updateProjectWorkRequest,
}

const ProjectsCardContainer = compose(
  connect(mapState, mapDispatch),
  withState('selectedProject', 'setSelectedProject', ''),
  withProps(({ projectWork, selectedProject, projects, isProjectsLoading, isWorkLoading, getIsWorkUpdating }) => {
    const projectsData = projects.filter(project => projectWork.find(work => work.projectUuid === project.uuid));
    const selectedWork = projectWork.find(work => String(work.projectUuid) === String(selectedProject));
    
    return {
      projectsData,
      selectedWork,
      isLoading: isProjectsLoading || isWorkLoading || false,
      isUpdating: getIsWorkUpdating(selectedWork?.uuid)
    }
  }),
  withHandlers({
    handleLoadProjectWork: ({ loadProjectWork, user, setSelectedProject }) => date => {
      const search = { date: stringifyDate(date) };
      loadProjectWork({ userUuid: user?.uuid, search }, { onSuccess: data => setSelectedProject(data[0].projectUuid)});
    },
    handleSelectProject: ({ setSelectedProject }) => uuid => setSelectedProject(uuid),
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadProjects();
      this.props.handleLoadProjectWork();
    }
  })
)(ProjectsCard);

export default ProjectsCardContainer;
