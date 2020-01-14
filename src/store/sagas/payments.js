import { put, delay } from "redux-saga/effects";
import { goBack } from "connected-react-router";

import { handleSagaError } from "./utils";
import actions from "../actions";

const payments = [
  {
    id: 1,
    title: "Аренда",
    currency: "RUR",
    currencyRate: 21.3,
    amount: 22,
    type: "outcome",
    date: "2019-11-21",
    author: 1,
    payer: "",
    receiver: "ООО АРЕНДОТ"
  },
  {
    id: 2,
    title: "Закрытие спринта",
    currency: "RUR",
    currencyRate: 23,
    amount: 10,
    type: "income",
    date: "2019-11-16",
    author: 1,
    payer: "ООО РУКС",
    receiver: ""
  },
  {
    id: 3,
    title: "Зарплата",
    currency: "RUR",
    currencyRate: 21,
    amount: 12,
    type: "income",
    date: "2019-12-20",
    author: 1,
    payer: "",
    receiver: "Уборщик"
  },
  {
    id: 4,
    title: "Продажа системы",
    currency: "RUR",
    currencyRate: 21,
    amount: 13,
    type: "income",
    date: "2019-12-20",
    author: 1,
    payer: "",
    receiver: "ITNER"
  },
  {
    id: 5,
    title: "Закупка оборудования",
    currency: "RUR",
    currencyRate: 21,
    amount: 20,
    type: "income",
    date: "2020-01-20",
    author: 1,
    payer: "",
    receiver: "OOO КОМПСТРОЙ"
  }
];

function* fetchPaymentsList(api, action) {
  try {
    // const response = yield call(
    //   api.fetchPayments,
    //   get(action, "payload.search")
    // );

    yield put(actions.paymentsListSuccess(payments));

    // if (response.status === 200) {
    // yield put(actions.paymentsListSuccess(response.data));
    // } else {
    //   throw response;
    // }
  } catch (error) {
    const errorMessage = "Error while fetching events list";

    yield handleSagaError(error, errorMessage, actions.paymentsListFailure);
  }
}

function* createPayment(api, action) {
  try {
    // const response = yield call(api.createPayment, get(action, "payload"));

    yield put(actions.createPaymentSuccess(payments[0]));
    yield put(goBack());

    // if (response.status === 200) {
    // yield put(actions.createPaymentSuccess(response.data));
    // yield put(goBack());
    // } else {
    //   throw response;
    // }
  } catch (error) {
    const errorMessage = "Error while creating payment";

    yield handleSagaError(error, errorMessage, actions.createPaymentFailure);
  }
}

function* updatePayment(api, action) {
  try {
    // const response = yield call(
    //   api.fetchPayments,
    //   get(action, "payload.search")
    // );

    yield delay(1000);
    yield put(goBack());
    yield put(actions.updatePaymentSuccess(payments));

    // if (response.status === 200) {
    // yield put(actions.updatePaymentSuccess(response.data));
    // } else {
    //   throw response;
    // }
  } catch (error) {
    const errorMessage = "Error while updating payment";

    yield handleSagaError(error, errorMessage, actions.updatePaymentFailure);
  }
}

function* deletePayment(api, action) {
  try {
    // const response = yield call(api.deletePayment, get(action, "payload.id"));

    yield delay(1000);
    yield put(actions.deletePaymentSuccess(payments[0]));

    // if (response.status === 200) {
    // yield put(actions.deletePaymentSuccess(response.data));
    // } else {
    //   throw response;
    // }
  } catch (error) {
    const errorMessage = "Error while deleting payment";

    yield handleSagaError(error, errorMessage, actions.deletePaymentFailure);
  }
}

export default {
  fetchPaymentsList,
  createPayment,
  updatePayment,
  deletePayment
};
