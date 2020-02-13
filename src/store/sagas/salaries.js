import { put, call, select, all } from "redux-saga/effects";
import { get, defaultTo } from "lodash";
import qs from "qs";

import { splitRange } from "../../services/chartUtils";
import { programDateFormat } from "../../services/formatters";
import { handleSagaError } from "./utils";
import actions from "../actions";
import selectors from "../selectors";
import moment from "moment";

function* createSalaryRange(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const salaries = yield select(state => selectors.getSalaries(state));
    const range = splitRange(payload.dateFrom, payload.dateTo, "month");

    const rangeActions = [];
    Object.keys(range).forEach(date => {
      const existedSalary = salaries.find(salary => salary.date === date);

      if (existedSalary) {
        rangeActions.push(
          put(
            actions.updateSalaryRequest({
              uuid: existedSalary.uuid,
              params: {
                user: payload.user,
                value: payload.value,
                date: moment(date, "YYYY-MM-DD").format("YYYY/MM")
              }
            })
          )
        );
      } else {
        rangeActions.push(
          put(
            actions.createSalaryRequest({
              user: payload.user,
              value: payload.value,
              date: moment(date, "YYYY-MM-DD").format("YYYY/MM")
            })
          )
        );
      }
    });

    yield all(rangeActions);
  } catch (error) {
    const errorMessage = "Error while creating salary range";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(
      error,
      errorMessage,
      actions.createSalaryRangeFailure
    );
  }
}

function* deleteSalaryRange(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const salaries = yield select(state => selectors.getSalaries(state));
    const range = splitRange(payload.dateFrom, payload.dateTo, "month");

    const rangeActions = [];
    Object.keys(range).forEach(date => {
      const existedSalary = salaries.find(
        salary =>
          moment(salary.date, programDateFormat).format("YYYY-MM") ===
          moment(date, programDateFormat).format("YYYY-MM")
      );
      if (!existedSalary) {
        debugger;
      }
      rangeActions.push(put(actions.deleteSalaryRequest(existedSalary.uuid)));
    });

    yield all(rangeActions);
  } catch (error) {
    const errorMessage = "Error while deleting salary range salary";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(
      error,
      errorMessage,
      actions.createSalaryRangeFailure
    );
  }
}

function* createSalary(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const response = yield call(
      api.createSalary,
      qs.stringify({ salary: payload })
    );

    if (response.status === 200) {
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
    const search = defaultTo(payload.search, "");
    const response = yield call(api.readSalaries, { search });

    if (response.status === 200) {
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

    if (response.status === 200) {
      yield put(
        actions.updateSalarySuccess({
          uuid: payload.uuid,
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
      actions.updateSalaryFailure({ uuid: get(payload, "uuid") })
    );
  }
}

function* deleteSalary(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const response = yield call(api.deleteSalary, payload);

    if (response.status === 200) {
      yield put(actions.deleteSalarySuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while deleting salary";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, () =>
      actions.deleteSalaryFailure({ uuid: get(payload, "uuid") })
    );
  }
}

export default {
  createSalary,
  readSalaries,
  updateSalary,
  deleteSalary,
  createSalaryRange,
  deleteSalaryRange
};
