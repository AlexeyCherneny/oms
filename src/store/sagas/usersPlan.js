import { put, delay, all, takeLatest, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import { replace } from "connected-react-router";

import actions from "../actions";
import Notification from "../../services/notification";
import { handleSagaError } from "./utils";

const data = [
  {
    date_from: "2020-01-01",
    date_to: "2020-01-31",
    number: 42,
    step: 4
  },
  {
    date_from: "2020-02-01",
    date_to: "2020-02-29",
    number: 46,
    step: 4
  },
  {
    date_from: "2020-03-01",
    date_to: "2020-03-31",
    number: 50,
    step: 4
  }
];

function* createUsersPlan(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    //const response = yield call(api.createUsersPlan, payload);
    const response = { status: 200, data: payload };

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.createUsersPlanSuccess(response.data));
      if (meta.onSuccess) meta.onSuccess(response.data);
      Notification.success("Планирование", "Данные успешно сохранены.");
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while creating planning";
    Notification.error("Планирование", "Не удалось сохранить данные.");
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.createUsersPlanFailure);
  }
}

function* loadUsersPlans(api, { payload = {}, meta = {} } = {}) {
  try {
    // const search = defaultTo(payload.search, "");
    //const response = yield call(api.readUsers, { search });
    const response = { status: 200, data };

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.usersPlansSuccess(response.data));
      if (meta.onSuccess) meta.onSuccess(response.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching planning";
    Notification.error("Планирование", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, actions.usersPlansFailure);
  }
}

function* updateUsersPlan(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    //const response = yield call(api.updateUser, payload);
    const response = { status: 200, data: payload };

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.updateUsersPlanSuccess());
      yield put(actions.setUsersPlanData(response.data));
      if (meta.onSuccess) meta.onSuccess(response.data);

      yield put(replace("/app/cabinet/users?role=employees"));
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while updating planning";

    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, () =>
      actions.updateUsersPlanFailure({ id: get(payload, "id") })
    );
  }
}

function* deleteUsersPlan(
  api,
  { payload, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    //const response = yield call(api.deleteUser, payload);
    const response = { status: 200, data: payload };

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.deleteUsersPlanSuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data);
      Notification.success("Планирование", "Данные успешно удалены.");
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while deleting planning";
    Notification.error(
      "Планирование",
      `Не удалось удалить данные: ${payload}.`
    );
    if (meta.onFailure) meta.onFailure(error);
    yield handleSagaError(error, errorMessage, () =>
      actions.deleteUsersPlanFailure({ id: get(payload, "id") })
    );
  }
}

export default function(api) {
  return all([
    takeLatest(actions.usersPlansRequest, loadUsersPlans, api),
    takeLatest(actions.createUsersPlanRequest, createUsersPlan, api),
    takeLatest(actions.updateUsersPlanRequest, updateUsersPlan, api),
    takeEvery(actions.deleteUsersPlanRequest, deleteUsersPlan, api)
  ]);
}
