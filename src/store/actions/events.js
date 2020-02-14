import { createAction } from "redux-act";

export const eventsListSuccess = createAction("EVENTS_LIST_SUCCESS");
export const eventsListRequest = createAction("EVENTS_LIST_REQUEST");
export const eventsListFailure = createAction("EVENTS_LIST_FAILURE");

export const createEventRequest = createAction("CREATE_EVENT_REQUEST", payload => payload, (_, meta = {}) => meta);
export const createEventSuccess = createAction("CREATE_EVENT_SUCCESS");
export const createEventFailure = createAction("CREATE_EVENT_FAILURE");

export const updateEventRequest = createAction("UPDATE_EVENT_REQUEST", payload => payload, (_, meta = {}) => meta);
export const updateEventSuccess = createAction("UPDATE_EVENT_SUCCESS");
export const updateEventFailure = createAction("UPDATE_EVENT_FAILURE");

export const fetchEventRequest = createAction("FETCH_EVENT_REQUEST");
export const fetchEventSuccess = createAction("FETCH_EVENT_SUCCESS");
export const fetchEventFailure = createAction("FETCH_EVENT_FAILURE");
export const fetchEventReset = createAction("FETCH_EVENT_RESET");

export const deleteEventRequest = createAction("DELETE_EVENT_REQUEST", payload => payload, (_, meta = {}) => meta);
export const deleteEventSuccess = createAction("DELETE_EVENT_SUCCESS");
export const deleteEventFailure = createAction("DELETE_EVENT_FAILURE");

export const showCreateEventDrawer = createAction("SHOW_CREATE_EVENT_DRAWER");
export const hideCreateEventDrawer = createAction("HIDE_CREATE_EVENT_DRAWER");

export const onEventChange = createAction("ON_EVENT_CHANGE");

export const pushEventToEventsList = createAction("PUSH_EVENT_TO_EVENTS_LIST");
export const updateEventToEventsList = createAction("UPDATE_EVENT_TO_EVENTS_LIST");
export const deleteEventFromEventsList = createAction("DELETE_EVENT_FROM_EVENTS_LIST");

export default {
  createEventRequest,
  createEventSuccess,
  createEventFailure,

  updateEventRequest,
  updateEventSuccess,
  updateEventFailure,

  fetchEventRequest,
  fetchEventSuccess,
  fetchEventFailure,
  fetchEventReset,

  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailure,

  eventsListSuccess,
  eventsListRequest,
  eventsListFailure,

  showCreateEventDrawer,
  hideCreateEventDrawer,

  onEventChange,

  pushEventToEventsList,
  updateEventToEventsList,
  deleteEventFromEventsList,
};
