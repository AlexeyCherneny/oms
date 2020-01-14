import { createReducer } from "redux-act";

import actions from "../actions";
import { requestHandler, successHandler, failureHandler } from "./utils";

const initialState = {
  user: null,

  fcmToken: {
    data: null,

    isLoading: false,
    isLoaded: true,
    isError: false
  },
  signIn: {
    isLoading: false,
    isLoaded: true,
    isError: false
  },
  logout: {
    isLoading: false,
    isLoaded: true,
    isError: false
  },
  publicAccess: {
    data: false,

    isLoading: false,
    isLoaded: true,
    isError: false
  }
};

const reducer = createReducer(
  {
    [actions.signInRequest]: requestHandler("signIn"),
    [actions.signInSuccess]: successHandler("signIn"),
    [actions.signInFailure]: failureHandler("signIn"),

    [actions.logoutRequest]: requestHandler("logout"),
    [actions.logoutSuccess]: successHandler("logout"),
    [actions.logoutFailure]: failureHandler("logout"),

    [actions.publicAccessRequest]: requestHandler("publicAccess"),
    [actions.publicAccessSuccess]: successHandler("publicAccess"),
    [actions.publicAccessFailure]: failureHandler("publicAccess"),

    [actions.saveFCMTokenRequest]: requestHandler("fcmToken"),
    [actions.saveFCMTokenSuccess]: successHandler("fcmToken"),
    [actions.saveFCMTokenFailure]: failureHandler("fcmToken"),

    [actions.resetPublicAccess]: state => ({
      ...state,
      publicAccess: {
        ...state.publicAccess,
        data: false
      }
    }),

    [actions.setUser]: (state, data) => ({ ...state, user: data.user }),
    [actions.resetUser]: () => ({ ...initialState }),
  },
  initialState
);

export default reducer;
