import { createReducer } from "redux-act";

import actions from "../actions";
import {
  requestHandler,
  successHandler,
  failureHandler,
  onChangeHandler
} from "./utils";

const initialState = {
  eventsList: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  createEvent: {
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  updateEvent: {
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  deleteEvent: {
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  fetchEvent: {
    data: null,
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  event: {}
};

const reducer = createReducer(
  {
    [actions.eventsListRequest]: requestHandler("eventsList"),
    [actions.eventsListSuccess]: successHandler("eventsList"),
    [actions.eventsListFailure]: failureHandler("eventsList"),

    [actions.createEventRequest]: requestHandler("createEvent"),
    [actions.createEventSuccess]: successHandler("createEvent"),
    [actions.createEventFailure]: failureHandler("createEvent"),

    [actions.updateEventRequest]: requestHandler("updateEvent"),
    [actions.updateEventSuccess]: successHandler("updateEvent"),
    [actions.updateEventFailure]: failureHandler("updateEvent"),

    [actions.deleteEventRequest]: requestHandler("deleteEvent"),
    [actions.deleteEventSuccess]: successHandler("deleteEvent"),
    [actions.deleteEventFailure]: failureHandler("deleteEvent"),

    [actions.fetchEventRequest]: requestHandler("fetchEvent"),
    [actions.fetchEventSuccess]: successHandler("fetchEvent"),
    [actions.fetchEventFailure]: failureHandler("fetchEvent"),
    [actions.fetchEventReset]: state => ({ ...state, fetchEvent: { ...initialState.fetchEvent }}),

    [actions.onEventChange]: onChangeHandler("event"),

    [actions.pushEventToEventsList]: (state, payload) => ({
      ...state,
      eventsList: {
        ...state.eventsList,
        data: Array.isArray(state.eventsList.data)
          ? [...state.eventsList.data, payload]
          : [payload]
      }
    }),

    [actions.updateEventToEventsList]: (state, payload) => {
      const data = Array.isArray(state.eventsList.data) ? [...state.eventsList.data] : [];
      const idx = data.findIndex(event => event.uuid === payload.uuid);
      data[idx] = payload;

      return {
        ...state,
        eventsList: { ...state.eventsList, data },
      };
    },

    [actions.deleteEventFromEventsList]: (state, payload) => {
      const uuid = Number(payload.uuid);
      const data = Array.isArray(state.eventsList.data) 
        ? [...state.eventsList.data].filter(event => event.uuid !== uuid) 
        : [];
      
      return {
        ...state,
        eventsList: { ...state.eventsList, data },
      };
    },
  },
  initialState
);

export default reducer;
