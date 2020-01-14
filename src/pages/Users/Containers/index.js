import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";

import Authenticated from "../../../Components/HOC/Authenticated";
import Users from "../Components";
import actions from "../../../store/actions";

const mapState = ({ authorization }) => ({
  role: authorization.user && authorization.user.role,
});

const mapDispatch = {
  fetchUsersList: actions.usersRequest
};

const UsersContainer = compose(
  Authenticated,
  connect(mapState, mapDispatch),
  withRouter,
  lifecycle({
    componentDidMount() {
      const { fetchUsersList, location } = this.props;

      fetchUsersList({ search: location.search });
    }
  })
)(Users);

export default UsersContainer;
