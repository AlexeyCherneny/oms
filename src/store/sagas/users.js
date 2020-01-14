import { call, put, delay } from "redux-saga/effects";
import { defaultTo, get } from "lodash";

import actions from "../actions";
import Notification from "../../services/notification";
import { handleSagaError } from "./utils";

function* createUser(api, { payload, meta = {} } = { payload: {}, meta: {} }) {
  try {
    const response = yield call(api.createUser, payload);

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.createUserSuccess(response.data));
      if (meta.onSuccess) meta.onSuccess(response.data);
      Notification.success('Сотрудники', 'Приглашение успешно отправлено.');
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while creating user";
    Notification.error('Сотрудники', 'Не удалось отправить приглашение.');
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

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(actions.usersSuccess(response.data));
      if (meta.onSuccess) meta.onSuccess(response.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching users list";
    Notification.error('Сотрудники', 'Не удалось загрузить данные.');
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.usersFailure);
  }
}

function* updateUser(api, { payload, meta = {} } = { payload: {}, meta: {} }) {
  try {
    const response = yield call(api.updateUser, payload);
    if (/200|201|204/.test(response.status)) {
      yield delay(1000);

      yield put(
        actions.updateUserSuccess({
          id: payload.id,
          item: response.data
        })
      );
      if (meta.onSuccess) meta.onSuccess(response.data);
      const { first_name, last_name } = response.data;
      Notification.success('Сотрудники', `Информция о сотруднике ${first_name || ''} ${last_name || ''} успешно обновлена.`);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while updating user";
    const { first_name, last_name } = payload.params;
    Notification.error('Сотрудники', `Ошибка обновления информации о сотруднике ${first_name || ''} ${last_name || ''}.`);
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, () =>
      actions.updateUserFailure({ id: get(payload, "id") })
    );
  }
}

function* deleteUser(api, { payload, meta = {} } = { payload: {}, meta: {} }) {
  const firstName = get(meta.user, 'first_name') || '';
  const lastName = get(meta.user, 'last_name') || '';
  try {
    const response = yield call(api.deleteUser, payload);

    if (/200|201|204/.test(response.status)) {
      yield delay(1000);
      yield put(actions.deleteUserSuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data);
      Notification.success('Сотрудники', `Cотрудник ${firstName} ${lastName} успешно удален.`);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while deleting users list";
    Notification.error('Сотрудники', `Не удалось удалить сотрудника ${firstName} ${lastName}.`);
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, () =>
      actions.deleteUserFailure({ id: get(payload, "id") })
    );
  }
}

export default { readUsers, updateUser, createUser, deleteUser };
