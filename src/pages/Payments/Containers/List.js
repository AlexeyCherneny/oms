import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import qs from "qs";
import moment from "moment";
import { push } from "connected-react-router";
import { get, defaultTo } from "lodash";

import {
  formatPaymentType,
  programDateFormat,
  displayDateFormat
} from "../../../services/formatters";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";

import List from "../Components/List";

const mapState = state => ({
  paymentsList: selectors.getPayments(state),
  paymentsFlags: selectors.getPaymentsFlags(state),
  isPaymentLoading: selectors.isPaymentLoading(state),
  usersList: defaultTo(get(state, "users.data", []), [])
});

const mapDispatch = {
  handleDelete: actions.deletePaymentRequest,
  push
};
const getFullName = user => {
  return user ? `${user.firstName} ${user.lastName}` : "";
};

const dateFormat = "YYYY-MM-DD";

const ListContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ paymentsList, paymentsFlags, push, usersList, location }) => {
    const values = qs.parse(location.search, { ignoreQueryPrefix: true });

    let startDate = moment()
      .startOf("month")
      .subtract(6, "month");
    if (values.start_date) {
      startDate = moment(values.start_date).startOf("month");
    }

    let endDate = moment()
      .startOf("month")
      .add(6, "month");
    if (values.end_date) {
      endDate = moment(values.end_date).startOf("month");
    }

    const filteredPayments = paymentsList.filter(
      payment =>
        moment(payment.date, dateFormat).isValid() &&
        moment(payment.date, dateFormat) < endDate &&
        moment(payment.date, dateFormat) >= startDate
    );

    const formattedPayments = filteredPayments.map(payment => ({
      ...payment,
      type: formatPaymentType(payment.type),
      date: moment(payment.date, programDateFormat).format(displayDateFormat),
      author: getFullName(usersList.find(user => String(user.id) === String(payment.author)))
    }));

    const handleEdit = payment => push(`payments/${payment.id}/edit`);
    const handleInfo = payment => push(`payments/${payment.id}/info`);

    return {
      payments: formattedPayments,
      handleEdit,
      handleInfo,
      ...paymentsFlags
    };
  })
)(List);

export default ListContainer;
