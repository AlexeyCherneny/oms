import { connect } from "react-redux";
import { compose } from "recompose";

import PermissionTab from "../Components/PermissionTab";
import actions from "../../../store/actions";

const mapState = ({ authorization }) => ({
  isPublic: authorization.publicAccess.data
});

const mapDispatch = {
  logout: actions.logoutRequest,
  publicRequest: actions.publicAccessRequest,
  resetPublicAccess: actions.resetPublicAccess,
};

const PermissionTabContainer = compose(
  connect(mapState, mapDispatch),
)(PermissionTab);

export default PermissionTabContainer;
