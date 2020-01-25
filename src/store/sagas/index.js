import { takeLatest, takeEvery, all, fork } from "redux-saga/effects";

import API from "../../services/api";
import actions from "../actions";

import applicationSagas from "./application";
import authorizationSagas from "./authorization";
import usersSagas from "./users";
import eventsSagas from "./events";
import salariesSagas from "./salaries";
import paymentsSagas from "./payments";
import documentsSagas from "./documents";
import usersPlanSagas from "./usersPlan";

const rootSaga = function* root() {
  const api = API.create();

  // APPLICATION ACTIONS
  yield fork(applicationSagas, api);

  // AUTHORIZATION ACTIONS
  yield fork(authorizationSagas, api);

  // USERS ACTIONS
  yield all([takeEvery(actions.createUserRequest, usersSagas.createUser, api)]);
  yield all([takeLatest(actions.usersRequest, usersSagas.readUsers, api)]);
  yield all([takeEvery(actions.updateUserRequest, usersSagas.updateUser, api)]);
  yield all([takeEvery(actions.deleteUserRequest, usersSagas.deleteUser, api)]);

  yield fork(usersPlanSagas, api);

  // EVENTS ACTIONS
  yield all([
    takeLatest(actions.eventsListRequest, eventsSagas.fetchEventsList, api),
    takeLatest(actions.createEventRequest, eventsSagas.createEvent, api),
    takeLatest(actions.fetchEventRequest, eventsSagas.fetchEvent, api),
    takeLatest(actions.updateEventRequest, eventsSagas.updateEvent, api),
    takeLatest(actions.deleteEventRequest, eventsSagas.deleteEvent, api)
  ]);

  // SALARIES ACTIONS
  yield all([
    takeLatest(actions.createSalaryRequest, salariesSagas.createSalary, api)
  ]);
  yield all([
    takeLatest(actions.salariesRequest, salariesSagas.readSalaries, api)
  ]);
  yield all([
    takeLatest(actions.updateSalaryRequest, salariesSagas.updateSalary, api)
  ]);
  yield all([
    takeLatest(actions.deleteSalaryRequest, salariesSagas.deleteSalary, api)
  ]);

  // PAYMENTS ACTIONS
  yield all([
    takeLatest(
      actions.paymentsListRequest,
      paymentsSagas.fetchPaymentsList,
      api
    )
  ]);
  yield all([
    takeLatest(actions.createPaymentRequest, paymentsSagas.createPayment, api)
  ]);
  yield all([
    takeLatest(actions.updatePaymentRequest, paymentsSagas.updatePayment, api)
  ]);
  yield all([
    takeLatest(actions.deletePaymentRequest, paymentsSagas.deletePayment, api)
  ]);

  // DOCUMENTS SAGAS
  yield fork(documentsSagas, api);
};

export default rootSaga;
