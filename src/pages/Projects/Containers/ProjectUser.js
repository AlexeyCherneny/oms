import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";

import ProjectUser from "../Components/ProjectUser";
import selectors from "../../../store/selectors";

const mapState = state => ({
  projectRates: selectors.getProjectRates(state)
});

const mapDispatch = {};

const ProjectUserContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ projectRates }) => {
    const rate = projectRates[projectRates.length - 1];

    return {
      rate
    };
  })
)(ProjectUser);

export default ProjectUserContainer;
