import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import Moment from "moment";

import Filter from "../Components/Filter";
import { programDateFormat } from "../../../services/formatters";

const mapState = ({ users, authorization }) => ({
  users,
  user: authorization.user
});


const FilterContainer = compose(
  connect(mapState),
  withHandlers({
    handleDateChange: ({ updateQuery }) => value => {
      const date = Moment(value).startOf('month').format(programDateFormat);
      updateQuery({ date });
    }
  }),
)(Filter);

export default FilterContainer;
