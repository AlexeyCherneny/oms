import { put, delay } from "redux-saga/effects";
import { get } from "lodash";

import { handleSagaError } from "./utils";
import actions from "../actions";

const salaries = [
  { id: 1, userId: 2, value: 100, currency: "USD", date: "2019-01-01" },
  { id: 2, userId: 2, value: 140, currency: "USD", date: "2019-02-01" },
  { id: 3, userId: 2, value: 160, currency: "USD", date: "2019-03-01" },
  { id: 4, userId: 2, value: 200, currency: "USD", date: "2019-04-01" },
  { id: 5, userId: 2, value: 200, currency: "USD", date: "2019-05-01" },
  { id: 6, userId: 2, value: 303, currency: "USD", date: "2019-06-01" },
  { id: 7, userId: 2, value: 303, currency: "USD", date: "2019-07-01" },
  { id: 8, userId: 2, value: 500, currency: "USD", date: "2019-08-01" },
  { id: 9, userId: 2, value: 500, currency: "USD", date: "2019-09-01" },
  { id: 10, userId: 2, value: 500, currency: "USD", date: "2019-10-01" }
];

function* createSalary(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    // const response = yield call(api.createSalary, payload);

    const response = {
      status: 200,
      data: { id: 10, value: 10, currency: "USD", date: "2020-01-01" }
    };
    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.createSalarySuccess(response.data));
      if (meta.onSuccess) meta.onSuccess(response.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while creating salary";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, actions.createSalaryFailure);
  }
}

function* readSalaries(
  api,
  { payload = {}, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    // const search = defaultTo(payload.search, "");
    // const response = yield call(api.readSalaries, { search });

    const response = {
      status: 200,
      data: salaries
    };

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.salariesSuccess(response.data));
      if (meta.onSuccess) meta.onSuccess(response.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching salaries list";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, actions.salariesFailure);
  }
}

function* updateSalary(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    // const response = yield call(api.updateSalary, payload);

    const response = {
      status: 200,
      data: { id: 1, value: 10, currency: "USD", date: "2020-01-01" }
    };

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(
        actions.updateSalarySuccess({
          id: payload.id,
          item: response.data
        })
      );
      if (meta.onSuccess) meta.onSuccess(response.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while updating salary";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, () =>
      actions.updateSalaryFailure({ id: get(payload, "id") })
    );
  }
}

function* deleteSalary(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    // const response = yield call(api.deleteSalary, payload);

    const response = {
      status: 200,
      data: { id: 1, value: 10, currency: "USD", date: "2020-01-01" }
    };

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.deleteSalarySuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while deleting salary";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, () =>
      actions.deleteSalaryFailure({ id: get(payload, "id") })
    );
  }
}

export default { createSalary, readSalaries, updateSalary, deleteSalary };
