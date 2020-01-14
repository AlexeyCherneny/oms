import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, withProps } from "recompose";
import { get } from "lodash";

import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import SalariesTable from "../Components/SalariesTable";
import { formatCurrency } from "../../../services/formatters";

const mapState = state => ({
  salaries: selectors.getSalaries(state),
  isDownloading: selectors.isSalariesDownloading(state),
  isSalaryDeleting: selectors.isSalaryDeleting(state),
  isSalaryUpdating: selectors.isSalaryUpdating(state),
  getUserById: selectors.getUserById(state)
});

const mapDispatch = {
  handleSalaryDelete: actions.deleteSalaryRequest
};

const SalariesTableContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ history, salaries, getUserById }) => {
    const tableData = salaries.map(salary => {
      const user = getUserById(salary.userId);

      const fullName = `${get(user, "last_name", "")} ${get(
        user,
        "first_name",
        ""
      )} ${get(user, "middle_name", "")}`;

      const amount = formatCurrency(salary.value, salary.currency);

      return {
        ...salary,
        full_name: fullName,
        amount: amount
      };
    });

    return {
      tableData,
      handleSalaryInfo: salary_id => history.push(`salaries/${salary_id}/info`),
      handleSalaryEdit: salary_id => history.push(`salaries/${salary_id}/edit`)
    };
  })
)(SalariesTable);

export default SalariesTableContainer;
