import { compose } from "recompose";

import Authenticated from "../../../Components/HOC/Authenticated";
import Salaries from "../Components";

const SalariesContainer = compose(Authenticated)(Salaries);

export default SalariesContainer;
