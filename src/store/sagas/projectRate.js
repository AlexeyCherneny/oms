import { call, put, takeLatest, all } from "redux-saga/effects";
import { defaultTo } from "lodash";

import actions from "../actions";
import Notification from "../../services/notification";
import { handleSagaError } from "./utils";

function* readProjectRates(
  api,
  { payload = {}, meta = {} } = { payload: {}, meta: {} }
) {
  try {
    const search = defaultTo(payload.search, "");
    const response = yield call(api.readProjectRates, { search });

    if (response.status === 200) {
      yield put(actions.projectRatesSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching ProjectRates list";
    Notification.error("Сотрудники", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);

    yield handleSagaError(error, errorMessage, actions.ProjectRatesFailure);
  }
}

export default function*(api) {
  yield all([takeLatest(actions.projectRatesRequest, readProjectRates, api)]);
}
