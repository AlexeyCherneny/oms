import { createAction } from "redux-act";

import { createCRUDActions } from "./utils";

const salariesActions = createCRUDActions("salary");

const setMySalary = createAction(
  `SET_MY_SALARY`,
  payload => payload,
  (_, meta) => meta
);
const resetMySalary = createAction(
  `RESET_MY_SALARY`,
  payload => payload,
  (_, meta) => meta
);

const readMySalaryRequest = createAction(
  `READ_MY_SALARY_REQUEST`,
  payload => payload,
  (_, meta) => meta
);
const readMySalarySuccess = createAction(
  `READ_MY_SALARY_SUCCESS`,
  payload => payload,
  (_, meta) => meta
);
const readMySalaryFailure = createAction(
  `READ_MY_SALARY_FAILURE`,
  payload => payload,
  (_, meta) => meta
);

const createSalaryRangeRequest = createAction(
  `CREATE_SALARY_RANGE_REQUEST`,
  payload => payload,
  (_, meta) => meta
);
const createSalaryRangeSuccess = createAction(
  `CREATE_SALARY_RANGE_SUCCESS`,
  payload => payload,
  (_, meta) => meta
);
const createSalaryRangeFailure = createAction(
  `CREATE_SALARY_RANGE_FAILURE`,
  payload => payload,
  (_, meta) => meta
);

const deleteSalaryRangeRequest = createAction(
  `DELETE_SALARY_RANGE_REQUEST`,
  payload => payload,
  (_, meta) => meta
);
const deleteSalaryRangeSuccess = createAction(
  `DELETE_SALARY_RANGE_SUCCESS`,
  payload => payload,
  (_, meta) => meta
);
const deleteSalaryRangeFailure = createAction(
  `DELETE_SALARY_RANGE_FAILURE`,
  payload => payload,
  (_, meta) => meta
);

export default {
  ...salariesActions,
  createSalaryRangeRequest,
  createSalaryRangeSuccess,
  createSalaryRangeFailure,
  deleteSalaryRangeRequest,
  deleteSalaryRangeSuccess,
  deleteSalaryRangeFailure,
  readMySalaryRequest,
  readMySalarySuccess,
  readMySalaryFailure,
  setMySalary,
  resetMySalary
};
