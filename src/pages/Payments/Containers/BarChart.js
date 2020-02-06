import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { groupBy, reduce, merge, mapValues, pickBy, reverse } from "lodash";

import { splitRange } from "../../../services/chartUtils";

import { programDateFormat } from "../../../services/formatters";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import BarChart from "../Components/BarChart";
const dateFormat = "YYYY-MM";
const mapState = state => ({ payments: selectors.getPayments(state) });

const mapDispatch = {
  fetchPaymentsList: actions.paymentsListRequest
};

const getPaymentName = payment =>
  payment.type === "income" ? "Доходы" : "Расходы";

const reducePayments = (payments, date) =>
  reduce(
    payments,
    (acc, payment) => {
      acc[getPaymentName(payment)] += payment.amount;
      return acc;
    },
    { date, Доходы: 0, Расходы: 0 }
  );

const BarChartContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ payments, location }) => {
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

    const range = splitRange(startDate, endDate, "month");

    const groupedPayments = groupBy(payments, payment =>
      moment(payment.date)
        .startOf("month")
        .format(programDateFormat)
    );

    const filteredGroupedPayments = pickBy(
      groupedPayments,
      (_, key) =>
        moment(key, programDateFormat).isValid() &&
        moment(key, programDateFormat) < endDate &&
        moment(key, programDateFormat) >= startDate
    );

    const paymentsRange = merge({}, range, filteredGroupedPayments);

    const barChartData = Object.values(
      mapValues(paymentsRange, reducePayments)
    );

    const formattedBarChartData = barChartData.map(data => ({
      ...data,
      date: moment(data.date, dateFormat).format("MM.YYYY")
    }));

    return {
      data: reverse(formattedBarChartData)
    };
  })
)(BarChart);

export default BarChartContainer;
