import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import qs from "qs";

import Notification from "../../services/notification";
import { handleSagaError, testResponse } from "./utils";
import actions from "../actions";

function* readDocuments(api, { meta = {} }) {
  try {
    const response = yield call(api.readDocuments);

    if (testResponse(response)) {
      yield put(actions.documentsSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Документы", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while fetching documents list";
    yield handleSagaError(error, errorMessage, actions.documentsFailure);
  }
}

function* createDocument(api, { payload = {}, meta = {}}) {
  try {
    const response = yield call(api.createDocument, qs.stringify(payload));

    if (testResponse(response)) {
      yield put(actions.createDocumentSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
      Notification.success("Документы", "Документ успешно создан.");
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Документы", "Не удалось создать документ.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while creating document";
    yield handleSagaError(error, errorMessage, actions.createDocumentFailure);
  }
}

function* updateDocument(api, { payload = {}, meta = {} }) {
  try {
    const response = yield call(api.updateDocument, { id: payload.uuid, params: qs.stringify(payload)});

    if (testResponse(response)) {
      yield put(actions.updateDocumentSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
      Notification.success("Документы", "Документ успешно изменен.");
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Документы", "Не удалось изменить документ.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while updating document";
    yield handleSagaError(error, errorMessage, actions.updateDocumentFailure);
  }
}

function* deleteDocument(api, { payload = {}, meta = {} }) {
  try {
    const response = yield call(api.deleteDocument, payload);

    if (testResponse(response)) {
      yield put(actions.deleteDocumentSuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data);
      Notification.success("Документы", "Документ успешно удален.");
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Документы", "Не удалось удалить документ.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while deleting document";
    yield handleSagaError(error, errorMessage, actions.deleteDocumentFailure);
  }
}

export default function*(api) {
  yield all([
    takeLatest(actions.documentsRequest, readDocuments, api),
    takeLatest(actions.createDocumentRequest, createDocument, api),
    takeLatest(actions.updateDocumentRequest, updateDocument, api),
    takeEvery(actions.deleteDocumentRequest, deleteDocument, api),
  ]);
}
