import { compose, lifecycle, withProps } from "recompose";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";

import PaymentsPage from "../Components";

const mapDispatch = {
  fetchPaymentsList: actions.paymentsListRequest,
  push
};

const PaymentsPageContainer = compose(
  Authenticated,
  connect(null, mapDispatch),
  withProps(({ push }) => {
    const handleCreate = () => push("payments/create");

    return {
      handleCreate
    };
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchPaymentsList();
    }
  })
)(PaymentsPage);

export default PaymentsPageContainer;
