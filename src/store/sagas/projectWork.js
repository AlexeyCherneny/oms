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
    const { projectId, search } = payload;
    const paramsObj = pick(search, ['date']);
    const response = yield call(api.readProjectWorks, { projectId, params: qs.stringify(paramsObj)});
    testResponse(response);

    yield put(actions.projectWorksSuccess(response.data.data));
    if (meta.onSuccess) meta.onSuccess(response.data.data);
  } catch (error) {
    const errorMessage = "Error while fetching project works list";
    Notification.error("Информация о проекте", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.projectWorksFailure);
  }
}

function* updateProjectWork(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const response = yield call(api.updateProjectWork, {
      id: payload.id,
      projectId: payload.project_id,
      params: qs.stringify(payload)
    });

    if (response.status === 200) {
      yield put(actions.updateProjectWorkSuccess(response.data.data));
      onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching updating project";
    Notification.error("Внимание", "Не удалось обновить отработку.");
    onFailure(error);

    yield handleSagaError(error, errorMessage, actions.updateProjectFailure);
  }
}

export default function*(api) {
  yield all([takeLatest(actions.projectWorksRequest, readProjectWorks, api)]);
  yield all([
    takeLatest(actions.updateProjectWorkRequest, updateProjectWork, api)
  ]);
}
