import { compose, withProps, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get, pick } from "lodash";

import { ROLES } from "../../../services/constants";
import selectors from "../../../store/selectors";
import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import Authenticated from "../../../Components/HOC/Authenticated";
import withRole from "../../../Components/HOC/withRole";
import actions from "../../../store/actions";
import ProfilePage from "../Components";
import { BASE_URL } from "../../Users/constants";
import { allowedRoles } from "../constants";

const mapState = state => ({
  getUserByUuid: selectors.getUserByUuid(state),
  isUserUpdating: selectors.isUserUpdating(state),
  isUserDeleting: selectors.isUserDeleting(state),
  user: state.authorization.user
});

const mapDispatch = {
  updateUser: actions.updateUserRequest
};

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

const ProfilePageContainer = compose(
  Authenticated,
  withRole({
    defaultUrl: BASE_URL,
    allowedRoles
  }),
  withRouter,
  drawerWrapper({
    title: "Пользователь",
    width: 450,
    defaultBackLocation: BASE_URL
  }),
  connect(mapState, mapDispatch),
  withProps(({ getUserByUuid, match, isUserUpdating, isUserDeleting }) => {
    let fields = [...userFields];

    const user = getUserByUuid(match.params.uuid);

    const isUpdating = isUserUpdating(match.params.uuid);
    const isDeleting = isUserDeleting(match.params.uuid);

    const disabled = isUpdating || isDeleting;

    const isEmployee = get(user, "roles", []).includes(!ROLES.HR);
    if (isEmployee) {
      fields = fields.filter(inpName => !["roles"].includes(inpName));
    }
    const initialValues = pick(user, fields);

    return {
      initialValues,
      availableFields: fields,
      submitTitle: "Обновить",
      disabled,
      isLoading: isUpdating
    };
  }),
  withHandlers({
    onSubmit: ({ updateUser, history, match }) => userInfo => {
      const meta = {
        onSuccess: () => history.push(BASE_URL)
      };

      updateUser({ uuid: match.params.uuid, params: userInfo }, meta);
    }
  })
)(ProfilePage);

export default ProfilePageContainer;
