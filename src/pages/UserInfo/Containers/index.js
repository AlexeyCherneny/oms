import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { get } from "lodash";

import { getFullName, formatPhone } from "../../../services/formatters";
import { DATE_FORMATS, ROLES_MEANING } from "../../../services/constants";
import selectors from "../../../store/selectors";
import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import UserInfo from "../Components";
import { BASE_URL } from "../../Users/constants";

const mapState = state => ({
  getUserByUuid: selectors.getUserByUuid(state)
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
  withProps(({ getUserByUuid, match }) => {
    const user = getUserByUuid(match.params.uuid);

    if (!user) {
      return {};
    }

    const fullName = getFullName(user);

    let birthday = moment(
      get(user, "birthday"),
      DATE_FORMATS.dashReverse
    ).format(DATE_FORMATS.dayMonthString);

    const phone = formatPhone(user.phone);

    return {
      user: {
        ...user,
        birthday,
        fullName,
        phone,
        role: ROLES_MEANING[user.roles[user.roles.length - 1]]
      }
    };
  })
)(UserInfo);

export default UserInfoContainer;
