import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import actions from "../../../store/actions";

import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import withRole from "../../../Components/HOC/withRole";
import CreateUser from "../Components";
import { BASE_URL } from "../../Users/constants";
import { allowedRoles } from "../constants";

const mapState = ({ users }) => ({
  isLoading: users.isCreating
});

const mapDispatch = {
  createUser: actions.createUserRequest
};

const CreateUserContainer = compose(
  withRole({
    defaultUrl: BASE_URL,
    allowedRoles
  }),
  withRouter,
  connect(mapState, mapDispatch),
  drawerWrapper({
    title: "Пригласить пользователя",
    width: 450,
    defaultBackLocation: BASE_URL
  }),
  withHandlers({
    handleSubmit: ({ createUser, history }) => params => {
      const meta = {
        onSuccess: () => history.push(BASE_URL)
      };
      createUser({ params }, meta);
    }
  })
)(CreateUser);

export default CreateUserContainer;
