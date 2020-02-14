import { createAction } from "redux-act";

import { createCRUDActions } from "./utils";

const salariesActions = createCRUDActions("salary");

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
  deleteSalaryRangeFailure
};
