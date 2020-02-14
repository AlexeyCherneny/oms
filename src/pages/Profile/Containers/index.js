import { compose, withProps, withHandlers } from "recompose";
import { connect } from "react-redux";
import { get, pick } from "lodash";

import { ROLES } from "../../../services/constants";
import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import ProfilePage from "../Components";

const mapState = state => ({
  user: state.authorization.user,
  isUpdating: selectors.isUserUpdating(state)
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
  connect(mapState, mapDispatch),
  withProps(({ user, isUpdating }) => {
    let fields = [...userFields];

    const isEmployee = get(user, "roles", []).includes(!ROLES.HR);
    if (isEmployee) {
      fields = fields.filter(inpName => !["roles"].includes(inpName));
    }

    const initialValues = pick(user, fields);
    const isLoading = isUpdating(user.uuid);

    return {
      initialValues,
      isLoading,
      submitTitle: "Обновить",
      availableFields: fields
    };
  }),
  withHandlers({
    onSubmit: ({ user, updateUser }) => userInfo => {
      updateUser({ uuid: user.uuid, params: userInfo });
    }
  })
)(ProfilePage);

export default ProfilePageContainer;
