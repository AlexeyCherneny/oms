import { createReducer } from "redux-act";
import {  get } from "lodash";

import actions from "../actions";

const initialState = {
  paymentsList: {
    data: [],
    isLoading: false
  },

  createPayment: {
    isLoading: false
  },

  loadingIds: []
};

const addToArray = (arr, item) => {
  const isItemInArray = arr.some(a => a === item);

  if (!isItemInArray) {
    return [...arr, item];
  }

  return arr;
};

const removeFromArray = (arr, item) => arr.filter(a => a !== item);

const reducer = createReducer(
  {
    [actions.paymentsListRequest]: state => {
      return {
        ...state,

        paymentsList: {
          ...state.paymentsList,
          data: [],

          isLoading: true
        }
      };
    },
    [actions.paymentsListSuccess]: (state, payload) => {
      return {
        ...state,

        paymentsList: {
          ...state.paymentsList,
          data: payload,
          isLoading: false
        }
      };
    },
    [actions.paymentsListFailure]: state => {
      return {
        ...state,

        paymentsList: {
          ...state.paymentsList,
          data: [],

          isLoading: false
        }
      };
    },

    // CREATE PAYMENT
    [actions.createPaymentRequest]: state => {
      return {
        ...state,

        createPayment: {
          ...state.createPayment,
          data: [],

          isLoading: true
        }
      };
    },
    [actions.createPaymentSuccess]: (state, payload) => {
      return {
        ...state,

        createPayment: {
          ...state.createPayment,
          isLoading: false
        },
        paymentsList: {
          ...state.paymentsList,
          data: [...state.paymentsList.data, payload]
        }
      };
    },
    [actions.createPaymentFailure]: state => {
      return {
        ...state,

        createPayment: {
          ...state.createPayment,
          data: [],

          isLoading: false
        }
      };
    },

    // UPDATE PAYMENT
    [actions.updatePaymentRequest]: (state, payload) => {
      return {
        ...state,

        loadingIds: addToArray(state.loadingIds, get(payload, "id"))
      };
    },
    [actions.updatePaymentSuccess]: (state, payload) => {
      return {
        ...state,

        loadingIds: removeFromArray(state.loadingIds, get(payload, "id"))
      };
    },
    [actions.updatePaymentFailure]: (state, payload) => {
      return {
        ...state,

        loadingIds: removeFromArray(state.loadingIds, get(payload, "id"))
      };
    },

    // DELETE PAYMENT
    [actions.deletePaymentRequest]: (state, payload) => {
      return {
        ...state,

        loadingIds: addToArray(state.loadingIds, get(payload, "id"))
      };
    },
    [actions.deletePaymentSuccess]: (state, payload) => {
      return {
        ...state,

        paymentsList: {
          ...state.paymentsList,
          data: state.paymentsList.data.filter(
            payment => payment.id !== get(payload, "id")
          )
        },
        loadingIds: removeFromArray(state.loadingIds, get(payload, "id"))
      };
    },
    [actions.deletePaymentFailure]: (state, payload) => {
      return {
        ...state,

        loadingIds: removeFromArray(state.loadingIds, get(payload, "id"))
      };
    }
  },
  initialState
);

export default reducer;
