import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import PaymentInfo from "../Components/PaymentInfo";

const mapState = state => ({
  state,
  ...selectors.getPaymentsFlags(state)
});

const mapDispatch = {
  handleSubmit: actions.createPaymentRequest
};

const PaymentInfoContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ match, state }) => {
    const payment = selectors.getPayment(state, get(match, "params.id"));

    return {
      payment
    };
  }),
  drawerWrapper({
    title: "Платеж",
    width: 540,
    defaultBackLocation: "/app/cabinet/payments"
  })
)(PaymentInfo);

export default PaymentInfoContainer;
