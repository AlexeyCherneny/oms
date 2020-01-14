import { createReducer } from "redux-act";

import actions from "../actions";
import { requestHandler, successHandler, failureHandler } from "./utils";

const initialState = {
  salariesList: {
    data: [],

    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

const reducer = createReducer(
  {
    [actions.salariesListRequest]: requestHandler("salariesList"),
    [actions.salariesListSuccess]: successHandler("salariesList"),
    [actions.salariesListFailure]: failureHandler("salariesList")
  },
  initialState
);

export default reducer;
