import { compose, withHandlers, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get, pick } from "lodash";

import actions from "../../../store/actions";

import { ROLES } from "../../../services/constants";
import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import withRole from "../../../Components/HOC/withRole";
import CreateUser from "../Components";
import { BASE_URL } from "../../Users/constants";
import { allowedRoles } from "../constants";

const userFields = [
  "photo",
  "email",
  "phone",
  "lastName",
  "firstName",
  "middleName",
  "roles",
  "birthday"
];

const mapState = state => ({
  isLoading: state.users.isCreating,
  user: state.authorization.user
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
  withProps(({ match, user }) => {
    let fields = [...userFields];

    const isEmployee = get(user, "roles", []).includes(!ROLES.HR);
    if (isEmployee) {
      fields = fields.filter(inpName => !["roles"].includes(inpName));
    }

    return {
      availableFields: fields,
      submitTitle: "Создать"
    };
  }),
  withHandlers({
    onSubmit: ({ createUser, history }) => userInfo => {
      const meta = {
        onSuccess: () => history.push(BASE_URL)
      };

      createUser(userInfo, meta);
    }
  })
)(CreateUser);

export default CreateUserContainer;
