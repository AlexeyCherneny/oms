import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { get } from "lodash";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import Payment from "../Components";

const mapState = state => ({
  isLoading: state.payments.paymentsList.isLoading,
  state
});

const mapDispatch = {
  handleSubmit: actions.updatePaymentRequest
};

const PaymentContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  drawerWrapper({
    title: "Редактировать платеж",
    width: 540,
    defaultBackLocation: "/app/cabinet/payments"
  }),
  withProps(({ state, match }) => {
    const payment = selectors.getPayment(state, get(match, "params.id"));

    return { initialValues: payment, sbmtButton: "Обновить" };
  })
)(Payment);

export default PaymentContainer;
