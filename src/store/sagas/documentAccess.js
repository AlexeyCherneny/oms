import { put, call, all, takeLatest, takeEvery } from "redux-saga/effects";
import qs from "qs";

import Notification from "../../services/notification";
import { handleSagaError, testResponse } from "./utils";
import actions from "../actions";

function* readAccesses(api, { payload = {}, meta = {} }) {
  try {
    const response = yield call(api.readDocumentAccesses, payload.documentId);

    if (testResponse(response)) {
      yield put(actions.documentAccessesSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Доступ для документа", "Не удалось загрузить данные.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while fetching document accesses list";
    yield handleSagaError(error, errorMessage, actions.documentAccessesFailure);
  }
}

function* createAccess(api, { payload = {}, meta = {} }) {
  const { documentId, data } = payload;

  try {
    const response = yield call(api.createDocumentAccesses, { documentId, params: qs.stringify(data)});

    if (testResponse(response)) {
      yield put(actions.createDocumentAccessSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
      Notification.success("Доступ для документа", "Доступ к документу успешно создан.");
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Доступ для документа", "Не удалось создать доступ для документа.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while creating document accesses";
    yield handleSagaError(error, errorMessage, actions.createDocumentAccessFailure);
  }
}

function* updateAccess(api, { payload = {}, meta = {} }) {

  try {
    const response = yield call(api.updateDocumentAccess, { id: payload.uuid, documentId: payload.documentId, params: qs.stringify(payload) });

    if (testResponse(response)) {
      yield put(actions.updateDocumentAccessSuccess(response.data.data));
      if (meta.onSuccess) meta.onSuccess(response.data.data);
      Notification.success("Доступ для документа", "Доступ к документу успешно изменен.");
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Доступ для документа", "Не удалось изменить доступ для документа.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while updating document access";
    yield handleSagaError(error, errorMessage, actions.updateDocumentAccessFailure, payload);
  }
}

function* deleteAccess(api, { payload = {}, meta = {} }) {
  try {
    const { data } = meta;
    const response = yield call(api.deleteDocumentAccess, { id: data.uuid, documentId: data.documentId });

    if (testResponse(response)) {
      yield put(actions.deleteDocumentAccessSuccess(payload));
      if (meta.onSuccess) meta.onSuccess(response.data);
      Notification.success("Доступ для документа", "Доступ к документу успешно удален.");
    } else {
      throw response;
    }
  } catch (error) {
    Notification.error("Доступ для документа", "Не удалось удалить доступ для документа.");
    if (meta.onFailure) meta.onFailure(error);

    const errorMessage = "Error while deleting document access";
    yield handleSagaError(error, errorMessage, actions.deleteDocumentAccessFailure, payload);
  }
}

export default function* (api) {
  yield all([
    takeLatest(actions.documentAccessesRequest, readAccesses, api),
    takeLatest(actions.createDocumentAccessRequest, createAccess, api),
    takeEvery(actions.updateDocumentAccessRequest, updateAccess, api),
    takeEvery(actions.deleteDocumentAccessRequest, deleteAccess, api),
  ]);
}
