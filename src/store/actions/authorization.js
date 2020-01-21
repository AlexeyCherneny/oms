import { createAction } from "redux-act";

export const signInRequest = createAction("SIGN_IN_REQUEST");
export const signInSuccess = createAction("SIGN_IN_SUCCESS");
export const signInFailure = createAction("SIGN_IN_FAILURE");

export const logoutRequest = createAction("LOGOUT_REQUEST");
export const logoutSuccess = createAction("LOGOUT_SUCCESS");
export const logoutFailure = createAction("LOGOUT_FAILURE");

export const publicAccessRequest = createAction("PUBLIC_ACCESS_REQUEST");
export const publicAccessSuccess = createAction("PUBLIC_ACCESS_SUCCESS");
export const publicAccessFailure = createAction("PUBLIC_ACCESS_FAILURE");

export const saveFCMTokenRequest = createAction("SAVE_FCM_TOKEN_REQUEST");
export const saveFCMTokenSuccess = createAction("SAVE_FCM_TOKEN_SUCCESS");
export const saveFCMTokenFailure = createAction("SAVE_FCM_TOKEN_FAILURE");

export const resetPublicAccess = createAction("RESET_PUBLIC_ACCESS");

export const setUser = createAction("SET_USER");
export const resetUser = createAction("RESET_USER");
export const setUserSettings = createAction("SET_USER_SETTINGS");

export default {
  signInRequest,
  signInSuccess,
  signInFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  publicAccessRequest,
  publicAccessSuccess,
  publicAccessFailure,

  saveFCMTokenRequest,
  saveFCMTokenSuccess,
  saveFCMTokenFailure,

  resetPublicAccess,

  setUser,
  resetUser,
  setUserSettings,

};
