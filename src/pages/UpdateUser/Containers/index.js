import { compose, withProps, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import selectors from "../../../store/selectors";
import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";
import ProfilePage from "../Components";
import { BASE_URL } from '../../Users/constants';

const mapState = state => ({
  getUserById: selectors.getUserById(state),
  isUserUpdating: selectors.isUserUpdating(state),
  isUserDeleting: selectors.isUserDeleting(state)
});

const mapDispatch = {
  updateUser: actions.updateUserRequest
};

const ProfilePageContainer = compose(
  Authenticated,
  withRouter,
  drawerWrapper({
    title: "Пользователь",
    width: 640,
    defaultBackLocation: BASE_URL
  }),
  connect(mapState, mapDispatch),
  withProps(({ getUserById, match, isUserUpdating, isUserDeleting }) => {
    const user = getUserById(match.params.id);

    const isUpdating = isUserUpdating(match.params.id);
    const isDeleting = isUserDeleting(match.params.id);

    const disabled = isUpdating || isDeleting;

    return {
      initialValues: user,
      disabled,
      isUpdating
    };
  }),
  withHandlers({
    handleSubmit: ({ updateUser, history, match }) => params => {
      const meta = {
        onSuccess: () => history.push(BASE_URL),
      };
      updateUser(
        {
          id: match.params.id,
          params
        },
        meta
      );
    }
  })
)(ProfilePage);

export default ProfilePageContainer;
