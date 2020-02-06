import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";

import Authenticated from "../../../Components/HOC/Authenticated";
import Projects from "../Components";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { withRouter } from "react-router";

const mapState = state => ({
  roles: state.authorization.user && state.authorization.user.roles,
  projects: selectors.getProjects(state)
});

const mapDispatch = {
  readProjects: actions.projectsRequest
};

const ProjectsContainer = compose(
  Authenticated,
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ match }) => ({
    indexPath: match.path,
  })),
  lifecycle({
    componentDidMount() {
      this.props.readProjects();
    }
  })
)(Projects);

export default ProjectsContainer;
