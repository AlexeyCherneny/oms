import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import actions from "../../../store/actions";

import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import InviteUser from "../Components";
import { BASE_URL } from "../../Users/constants";

const mapState = ({ users }) => ({
  isLoading: users.isCreating
});

const mapDispatch = {
  inviteUser: actions.createUserRequest
};

const InviteUserContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  drawerWrapper({
    title: "Пригласить пользователя",
    width: 640,
    defaultBackLocation: BASE_URL
  }),
  withHandlers({
    invitePerson: ({ inviteUser, history }) => params => {
      const meta = {
        onSuccess: () => history.push(BASE_URL)
      };
      inviteUser({ params }, meta);
    }
  })
)(InviteUser);

export default InviteUserContainer;
