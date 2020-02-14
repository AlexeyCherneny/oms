import { call, put } from "redux-saga/effects";

import { handleSagaError } from "./utils";
import actions from "../actions";

function* fetchEventsList(api, action) {
  try {
    const response = yield call(api.fetchEvents, action.payload.search);

    if (response.status === 200) {
      yield put(actions.eventsListSuccess(response.data));
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching events list";

    yield handleSagaError(error, errorMessage, actions.eventsListFailure);
  }
}

function* createEvent(api, { payload, meta }) {
  try {
    const response = yield call(api.createEvent, { ...payload });

    if (/^200|201$/.test(response.status)) {
      yield put(actions.createEventSuccess(response.data));
      yield put(actions.pushEventToEventsList(response.data));
      if (meta.onSuccess) meta.onSuccess();
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while creating event";

    yield handleSagaError(error, errorMessage, actions.createEventFailure);
  }
}

function* updateEvent(api, { payload, meta }) {
  try {
    const response = yield call(api.updateEvent, { ...payload });

    if (/^200|201$/.test(response.status)) {
      yield put(actions.updateEventSuccess(response.data));
      yield put(actions.updateEventToEventsList(response.data));
      if (meta.onSuccess) meta.onSuccess();
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while updating event";

    yield handleSagaError(error, errorMessage, actions.updateEventFailure);
  }
}

function* fetchEvent(api, { payload }) {
  try {
    const response = yield call(api.fetchEvent, { ...payload });

    if (/^200|201$/.test(response.status)) {
      yield put(actions.fetchEventSuccess(response.data));
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while updating event";

    yield handleSagaError(error, errorMessage, actions.fetchEventFailure);
  }
}

function* deleteEvent(api, { payload, meta }) {
  try {
    const response = yield call(api.deleteEvent, { ...payload });

    if (/^200|201$/.test(response.status)) {
      yield put(actions.deleteEventSuccess(response.data));
      yield put(actions.deleteEventFromEventsList(payload));
      if (meta.onSuccess) meta.onSuccess();
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while updating event";

    yield handleSagaError(error, errorMessage, actions.deleteEventFailure);
  }
}

export default { fetchEventsList, fetchEvent, createEvent, updateEvent, deleteEvent };
