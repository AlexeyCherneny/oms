import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import qs from "qs";
import moment from "moment";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import PieChart from "../../../Components/Charts/PieChart/PieChart";

const mapState = state => ({ paymentsList: selectors.getPayments(state) });

const mapDispatch = {
  fetchPaymentsList: actions.paymentsListRequest
};

const dateFormat = "YYYY-MM-DD";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const PieChartContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ paymentType, paymentsList, location }) => {
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

    const filteredPayments = paymentsList
      .filter(payment => payment.type === paymentType)
      .filter(
        payment =>
          moment(payment.date, dateFormat).isValid() &&
          moment(payment.date, dateFormat) < endDate &&
          moment(payment.date, dateFormat) >= startDate
      );

    const pieChartData = filteredPayments.map(payment => ({
      name: payment.title,
      value: payment.amount,
      color: getRandomColor()
    }));

    return {
      pieChartData
    };
  })
)(PieChart);

export default PieChartContainer;
