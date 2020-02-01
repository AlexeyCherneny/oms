import { call, put, all, takeLatest } from "redux-saga/effects";
import { defaultTo } from "lodash";
import qs from "qs";

import actions from "../actions";
import Notification from "../../services/notification";
import { handleSagaError, spreadAction } from "./utils";

function* readProjectWorks(
  api,
  { payload = {}, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const search = defaultTo(payload.search, "");
    const response = yield call(api.readProjectWork, { search });

    if (response.status === 200) {
      yield put(actions.projectWorksSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching projectWorks list";
    Notification.error("Сотрудники", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.projectWorksFailure);
  }
}

function* updateProjectWork(api, action) {
  const { payload, onSuccess, onFailure } = spreadAction(action);

  try {
    const response = yield call(api.updateProjectWork, {
      id: payload.id,
      params: qs.stringify(payload.params)
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
