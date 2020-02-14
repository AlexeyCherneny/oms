import { compose } from "recompose";

import withRole from "../../../Components/HOC/withRole";
import Authenticated from "../../../Components/HOC/Authenticated";
import Salaries from "../Components";
import { allowedRoles } from "../constants";

const SalariesContainer = compose(
  Authenticated,
  withRole({
    defaultUrl: "/app/cabinet",
    allowedRoles
  })
)(Salaries);

export default SalariesContainer;
