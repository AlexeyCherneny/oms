import { connect } from "react-redux";
import { get } from "lodash";
import { compose } from "recompose";

import Header from "../Components";

const mapState = ({ authorization }) => ({
  role: get(authorization, "user.role")
});

const HeaderContainer = compose(connect(mapState))(Header);

export default HeaderContainer;
