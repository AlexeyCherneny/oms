import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { reduxForm, formValueSelector } from "redux-form";
import { get } from "lodash";

import SalaryRange from "../Components";
import { getShortName } from "../../../../services/formatters";
import selectors from "../../../../store/selectors";
import { getAvailableFieldsNames } from "../index";

const selector = formValueSelector("salary");

const mapState = state => ({
  user: state.authorization.user,
  users: selectors.getUsers(state),
  dateFrom: selector(state, "dateFrom"),
  dateTo: selector(state, "dateTo")
});

const SalaryRangeContainer = compose(
  connect(mapState),
  withProps(({ users, user }) => {
    const usersOptions = users.map(user => ({
      label: getShortName(user),
      value: user.uuid
    }));

    return {
      availableFields: getAvailableFieldsNames(get(user, "roles", [])),
      usersOptions
    };
  }),
  reduxForm({
    form: "salary",
    enableReinitialize: true
  })
)(SalaryRange);

export default SalaryRangeContainer;
