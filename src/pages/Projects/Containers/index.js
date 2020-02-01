import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import Authenticated from "../../../Components/HOC/Authenticated";
import Projects from "../Components";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

const mapState = state => ({
  roles: state.authorization.user && state.authorization.user.roles,
  projects: selectors.getProjects(state)
});

const mapDispatch = {
  readProjects: actions.projectsRequest
};

const ProjectsContainer = compose(
  Authenticated,
  connect(mapState, mapDispatch),
  lifecycle({
    componentDidMount() {
      const { readProjects } = this.props;

      readProjects();
    }
  })
)(Projects);

export default ProjectsContainer;
