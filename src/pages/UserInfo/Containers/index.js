import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import selectors from "../../../store/selectors";
import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import UserInfo from "../Components";
import { BASE_URL } from "../../Users/constants";

const mapState = state => ({
  getUserById: selectors.getUserById(state)
});

const UserInfoContainer = compose(
  drawerWrapper({
    title: "Пользователь",
    width: 500,
    defaultBackLocation: BASE_URL,
    bodyStyle: { padding: 0 }
  }),
  connect(mapState),
  withRouter,
  withProps(({ getUserById, match }) => {
    const user = getUserById(match.params.id);

    return { user };
  })
)(UserInfo);

export default UserInfoContainer;
