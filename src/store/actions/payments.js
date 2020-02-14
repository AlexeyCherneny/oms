import { createAction } from "redux-act";

export const paymentsListRequest = createAction("PAYMENTS_LIST_REQUEST");
export const paymentsListSuccess = createAction("PAYMENTS_LIST_SUCCESS");
export const paymentsListFailure = createAction("PAYMENTS_LIST_FAILURE");

export const createPaymentRequest = createAction("CREATE_PAYMENT_REQUEST");
export const createPaymentSuccess = createAction("CREATE_PAYMENT_SUCCESS");
export const createPaymentFailure = createAction("CREATE_PAYMENT_FAILURE");

export const updatePaymentRequest = createAction("UPDATE_PAYMENT_REQUEST");
export const updatePaymentSuccess = createAction("UPDATE_PAYMENT_SUCCESS");
export const updatePaymentFailure = createAction("UPDATE_PAYMENT_FAILURE");

export const deletePaymentRequest = createAction("DELETE_PAYMENT_REQUEST");
export const deletePaymentSuccess = createAction("DELETE_PAYMENT_SUCCESS");
export const deletePaymentFailure = createAction("DELETE_PAYMENT_FAILURE");

export default {
  paymentsListSuccess,
  paymentsListRequest,
  paymentsListFailure,
  createPaymentRequest,
  createPaymentSuccess,
  createPaymentFailure,
  updatePaymentRequest,
  updatePaymentSuccess,
  updatePaymentFailure,
  deletePaymentRequest,
  deletePaymentSuccess,
  deletePaymentFailure
};
