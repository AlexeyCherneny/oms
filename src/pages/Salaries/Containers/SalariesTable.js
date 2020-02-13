import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, withProps } from "recompose";
import moment from "moment";

import {
  displayDateFormat,
  programDateFormat,
  getFullName
} from "../../../services/formatters";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import SalariesTable from "../Components/SalariesTable";
import { formatCurrency } from "../../../services/formatters";

const mapState = state => ({
  salaries: selectors.getSalaries(state),
  isDownloading: selectors.isSalariesDownloading(state),
  isSalaryDeleting: selectors.isSalaryDeleting(state),
  isSalaryUpdating: selectors.isSalaryUpdating(state),
  getUserByUuid: selectors.getUserByUuid(state)
});

const mapDispatch = {
  handleSalaryDelete: actions.deleteSalaryRequest
};

const SalariesTableContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ salaries, getUserByUuid }) => {
    const tableData = salaries.map(salary => {
      return {
        ...salary,
        date: moment(salary.date, programDateFormat).format(displayDateFormat),
        fullName: getFullName(getUserByUuid(salary.userUuid)),
        amount: formatCurrency(salary.value, "USD")
      };
    });

    return {
      tableData
    };
  })
)(SalariesTable);

export default SalariesTableContainer;
