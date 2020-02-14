import { compose } from "recompose";
import { connect } from "react-redux";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import Payment from "../Components";

const mapState = state => ({
  ...selectors.getPaymentsFlags(state)
});

const mapDispatch = {
  handleSubmit: actions.createPaymentRequest
};

const PaymentContainer = compose(
  drawerWrapper({
    title: "Создать платеж",
    width: 540,
    defaultBackLocation: "/app/cabinet/payments"
  }),
  connect(mapState, mapDispatch)
)(Payment);

export default PaymentContainer;
