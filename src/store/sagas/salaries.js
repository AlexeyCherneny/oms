import { put, delay, call } from "redux-saga/effects";
import { get, defaultTo } from "lodash";

import { handleSagaError } from "./utils";
import actions from "../actions";

function* createSalary(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const response = yield call(api.createSalary, payload);

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.createSalarySuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
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
    const response = yield call(api.readSalaries);

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.salariesSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
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
    const response = yield call(api.updateSalary, payload);

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(
        actions.updateSalarySuccess({
          id: payload.id,
          item: response.data.data
        })
      );
      if (meta.onSuccess) meta.onSuccess(response.data.data);
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
    const response = yield call(api.deleteSalary, payload);

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.deleteSalarySuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
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
