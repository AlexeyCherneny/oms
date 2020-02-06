import { call, put, delay } from "redux-saga/effects";
import { defaultTo, get } from "lodash";
import qs from "qs";

import actions from "../actions";
import Notification from "../../services/notification";
import { handleSagaError } from "./utils";

function* createUser(api, { payload, meta = {} } = { payload: {}, meta: {} }) {
  try {
    const response = yield call(api.createUser, qs.stringify(payload));

    if (response.status === 200) {
      yield put(actions.createUserSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
      Notification.success("Внимание", "Пользователь успешно создан.");
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while creating user";
    Notification.error("Внимание", "Не удалось создать пользователя.");
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.createUserFailure);
  }
}

function* readUsers(
  api,
  { payload = {}, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const search = defaultTo(payload.search, "");
    const response = yield call(api.readUsers, { search });

    if (response.status === 200) {

      yield put(actions.usersSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching users list";
    Notification.error("Сотрудники", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.usersFailure);
  }
}

function* updateUser(api, { payload, meta = {} } = { payload: {}, meta: {} }) {
  try {
    const response = yield call(api.updateUser, {
      ...payload,
      params: qs.stringify(payload.params)
    });

    if (response.status === 200) {
      yield put(
        actions.updateUserSuccess({
          id: payload.uuid,
          ...response.data.data
        })
      );
      if (meta.onSuccess) meta.onSuccess(response.data);
      const { firstName, lastName } = response.data;
      Notification.success(
        "Сотрудники",
        `Информция о сотруднике ${firstName || ""} ${lastName ||
          ""} успешно обновлена.`
      );
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while updating user";

    const { firstName, lastName } = payload.params;
    Notification.error(
      "Сотрудники",
      `Ошибка обновления информации о сотруднике ${firstName ||
        ""} ${lastName || ""}.`
    );
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, () =>
      actions.updateUserFailure(payload)
    );
  }
}

function* deleteUser(api, { payload, meta = {} } = { payload: {}, meta: {} }) {
  const firstName = get(meta.user, "firstName") || "";
  const lastName = get(meta.user, "lastName") || "";
  try {
    const response = yield call(api.deleteUser, payload);

    if (response.status === 200) {
      yield put(actions.deleteUserSuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data);
      Notification.success(
        "Сотрудники",
        `Cотрудник ${firstName} ${lastName} успешно удален.`
      );
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while deleting users list";
    Notification.error(
      "Сотрудники",
      `Не удалось удалить сотрудника ${firstName} ${lastName}.`
    );
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, () =>
      actions.deleteUserFailure(payload)
    );
  }
}

export default { readUsers, updateUser, createUser, deleteUser };
