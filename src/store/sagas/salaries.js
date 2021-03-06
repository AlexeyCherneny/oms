import { put, call, select, all } from "redux-saga/effects";
import { get, defaultTo } from "lodash";
import qs from "qs";

import { splitRange } from "../../services/chartUtils";
import Notification from "../../services/notification";
import { programDateFormat } from "../../services/formatters";
import { DATE_FORMATS } from "../../services/constants";
import { handleSagaError } from "./utils";
import actions from "../actions";
import selectors from "../selectors";
import moment from "moment";

const notificationTitle = "Внимание";

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

      const params = {
        value: payload.value,
        user: payload.userUuid,
        date: moment(date, "YYYY-MM-DD").format("YYYY-MM")
      };
      let action;

      if (existedSalary) {
        action = put(
          actions.updateSalaryRequest({ uuid: existedSalary.uuid, params })
        );
      } else {
        action = put(actions.createSalaryRequest(params));
      }
      rangeActions.push(action);
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
          moment(salary.date, DATE_FORMATS.dashReverse).format("YYYY-MM") ===
          moment(date, DATE_FORMATS.dashReverse).format("YYYY-MM")
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
    const params = qs.stringify({ salary: payload });

    const response = yield call(api.createSalary, params);

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

    Notification.error(notificationTitle, "Ошибка создания зарплаты.");
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
    const uuid = payload.uuid;
    const params = qs.stringify({ salary: payload.params });

    const response = yield call(api.updateSalary, { uuid, params });

    if (response.status === 200) {
      yield put(actions.updateSalarySuccess(response.data.data));
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

    Notification.error(notificationTitle, "Ошибка обновления зарплаты.");
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

    Notification.error(notificationTitle, "Ошибка удаления зарплаты.");
  } finally {
  }
}

function* readMySalary(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const params = {
      search:
        "?" +
        qs.stringify({
          dateFrom: moment().format(DATE_FORMATS.dashReverse),
          dateTo: moment().format(DATE_FORMATS.dashReverse)
        })
    };

    const response = yield call(api.readSalaries, params);

    if (response.status === 200) {
      yield put(actions.readMySalarySuccess(response.data.data[0]));

      if (meta.onSuccess) meta.onSuccess(response.data.data[0]);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while deleting salary";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, actions.readMySalaryFailure);

    Notification.error(notificationTitle, "Ошибка удаления зарплаты.");
  } finally {
  }
}

export default {
  createSalary,
  readSalaries,
  updateSalary,
  deleteSalary,
  createSalaryRange,
  deleteSalaryRange,
  readMySalary
};
