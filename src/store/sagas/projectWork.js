import { call, put, all, takeLatest } from "redux-saga/effects";
import { pick } from "lodash";
import qs from "qs";

import actions from "../actions";
import Notification from "../../services/notification";
import { handleSagaError, spreadAction, testResponse } from "./utils";

function* readProjectWorks(
  api,
  { payload = {}, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const { projectUuid, userUuid, search } = payload;
    const paramsObj = pick(search, ['date']);
    const response = yield call(api.readProjectWorks, { projectUuid, userUuid, params: qs.stringify(paramsObj)});
    testResponse(response);

    yield put(actions.projectWorksSuccess(response.data.data));
    if (meta.onSuccess) meta.onSuccess(response.data.data);
  } catch (error) {
    const errorMessage = "Error while fetching project work list";
    Notification.error("Информация о проекте", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.projectWorksFailure);
  }
}

function* createProjectWork(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const response = yield call(api.createProjectWork, {
      projectUuid: payload.projectUuid,
      params: qs.stringify(payload.params)
    });

    testResponse(response);
    yield put(actions.createProjectWorkSuccess(response.data.data));
    onSuccess(response.data.data);

  } catch (error) {
    const errorMessage = "Error while fetching updating project";
    Notification.error("Внимание", "Не удалось обновить отработку.");
    onFailure(error);

    yield handleSagaError(error, errorMessage, actions.createProjectFailure);
  }
}

function* updateProjectWork(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const response = yield call(api.updateProjectWork, {
      uuid: payload.uuid,
      projectUuid: payload.projectUuid,
      params: qs.stringify(payload)
    });

    testResponse(response);
    yield put(actions.updateProjectWorkSuccess(response.data.data));
    onSuccess(response.data.data);

  } catch (error) {
    const errorMessage = "Error while fetching updating project";
    Notification.error("Внимание", "Не удалось обновить отработку.");
    onFailure(error);

    yield handleSagaError(error, errorMessage, actions.updateProjectFailure);
  }
}

function* deleteProjectWork(api, action) {
  const { payload, onSuccess, onFailure, data } = spreadAction(action);
  
  try {
    const response = yield call(api.deleteProjectWork, { uuid: payload, projectUuid: data.projectUuid });
    testResponse(response);

    yield put(actions.deleteProjectWorkSuccess(payload));
    Notification.success("Проекты", "Информация о пользователе успешно удалена.");
    onSuccess(response.data);

  } catch (error) {
    const errorMessage = "Error while deleting project list";
    Notification.error("Проекты", "Не удалось удалить проект.");
    onFailure(error);

    yield handleSagaError(error, errorMessage, () =>
      actions.deleteProjectWorkFailure(payload)
    );
  }
}

export default function*(api) {
  yield all([
    takeLatest(actions.projectWorksRequest, readProjectWorks, api),
    takeLatest(actions.createProjectWorkRequest, createProjectWork, api),
    takeLatest(actions.updateProjectWorkRequest, updateProjectWork, api),
    takeLatest(actions.deleteProjectWorkRequest, deleteProjectWork, api)
  ]);
}
