import { call, put, all, takeLatest } from "redux-saga/effects";
import { defaultTo } from "lodash";
import qs from "qs";

import actions from "../actions";
import Notification from "../../services/notification";
import { handleSagaError, spreadAction, testResponse } from "./utils";

function* createProject(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const response = yield call(api.createProject, qs.stringify(payload));
    testResponse(response);

    yield put(actions.createProjectSuccess(response.data.data));
    Notification.success("Проекты", "Проект успешно создан.");
    onSuccess(response.data.data);
    
  } catch (error) {
    const errorMessage = "Error while creating Project";
    Notification.error("Внимание", "Не удалось создать проект.");
    onFailure();

    yield handleSagaError(error, errorMessage, actions.createProjectFailure);
  }
}

function* readProjects(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const search = defaultTo(payload.search, "");
    const response = yield call(api.readProjects, { search });

    if (response.status === 200) {
      yield put(actions.projectsSuccess(response.data.data));
      onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching projects list";
    Notification.error("Внимание", "Не удалось загрузить проекты.");
    onFailure();

    yield handleSagaError(error, errorMessage, actions.projectsFailure);
  }
}

function* updateProject(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const response = yield call(api.updateProject, {
      uuid: payload.uuid,
      params: qs.stringify(payload)
    });

    if (testResponse(response)) {
      yield put(actions.updateProjectSuccess(response.data.data));
      Notification.success("Проекты", "Проект успешно обновлен.");
      onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching updating project";
    Notification.error("Проекты", "Не удалось обновить проект.");
    onFailure(error);

    yield handleSagaError(error, errorMessage, actions.updateProjectFailure);
  }
}

function* deleteProject(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const response = yield call(api.deleteProject, payload);

    if (testResponse(response)) {
      yield put(actions.deleteProjectSuccess(payload));
      Notification.success("Проекты", "Проект успешно удален.");
      onSuccess(response.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while deleting project list";
    Notification.error("Проекты", "Не удалось удалить проект.");
    onFailure(error);

    yield handleSagaError(error, errorMessage, () =>
      actions.deleteProjectFailure(payload)
    );
  }
}

export default function*(api) {
  yield all([takeLatest(actions.projectsRequest, readProjects, api)]);
  yield all([takeLatest(actions.createProjectRequest, createProject, api)]);
  yield all([takeLatest(actions.updateProjectRequest, updateProject, api)]);
  yield all([takeLatest(actions.deleteProjectRequest, deleteProject, api)]);
}
