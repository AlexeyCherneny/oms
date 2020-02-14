import { createReducer } from "redux-act";

import actions from "../actions";
import { requestHandler, successHandler, failureHandler } from "./utils";

const initialState = {
  initializing: {
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  calendar: {
    data: null,

    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

const reducer = createReducer(
  {
    [actions.initializeApplicationRequest]: requestHandler("initializing"),
    [actions.initializeApplicationSuccess]: successHandler("initializing"),
    [actions.initializeApplicationFailure]: failureHandler("initializing")
  },
  initialState
);

export default reducer;
