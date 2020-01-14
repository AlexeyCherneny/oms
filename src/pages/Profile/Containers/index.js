import { compose, withProps } from "recompose";
import { connect } from "react-redux";

import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";
import ProfilePage from "../Components";

const mapState = ({ authorization, users }) => ({
  isLoading: users.isLoading,
  user: authorization.user
});

const mapDispatch = {
  updateUser: actions.updateUserRequest
};

const ProfilePageContainer = compose(
  Authenticated,
  connect(mapState, mapDispatch),
  withProps(({ updateUser, user }) => {
    return {
      initialValues: user,
      handleSubmit: userInfo => {
        updateUser({
          ...user,
          ...userInfo
        });
      }
    };
  })
)(ProfilePage);

export default ProfilePageContainer;
