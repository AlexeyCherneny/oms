import { withRouter } from "react-router-dom";
import { compose} from "recompose";

import { Authenticated, withRole } from "../../../Components/HOC";
import UsersPlan from "../Components";
import { allowedRoles, PARENT_URL } from '../constants';

const UsersPlanContainer = compose(
  Authenticated,
  withRole({ 
    defaultUrl: PARENT_URL, 
    allowedRoles,
  }),
  withRouter,
)(UsersPlan);

export default UsersPlanContainer;
