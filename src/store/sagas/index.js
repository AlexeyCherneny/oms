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
import projectsSagas from "./projects";
import usersPlanSagas from "./usersPlan";
import modalSagas from "./modal";
import projectWorkSagas from "./projectWork";
import documentAccessesSagas from "./documentAccess";

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
    takeEvery(actions.createSalaryRequest, salariesSagas.createSalary, api)
  ]);
  yield all([
    takeEvery(
      actions.createSalaryRangeRequest,
      salariesSagas.createSalaryRange,
      api
    )
  ]);
  yield all([
    takeEvery(
      actions.deleteSalaryRangeRequest,
      salariesSagas.deleteSalaryRange,
      api
    )
  ]);
  yield all([
    takeEvery(actions.salariesRequest, salariesSagas.readSalaries, api)
  ]);
  yield all([
    takeEvery(actions.updateSalaryRequest, salariesSagas.updateSalary, api)
  ]);
  yield all([
    takeEvery(actions.deleteSalaryRequest, salariesSagas.deleteSalary, api)
  ]);
  yield all([
    takeEvery(actions.readMySalaryRequest, salariesSagas.readMySalary, api)
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
  yield fork(documentAccessesSagas, api);

  // PROJECT SAGAS
  yield fork(projectsSagas, api);

  // PROJECT WORK SAGAS
  yield fork(projectWorkSagas, api);

  // MODAL SAGAS
  yield fork(modalSagas, api);
};

export default rootSaga;
