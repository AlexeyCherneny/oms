import { call, put } from "redux-saga/effects";
import { replace } from "connected-react-router";

import {
  setApiAuthorizationHeader,
  saveAuthToken,
  cleanAuthToken,
  saveUser,
  cleanUser,
  handleSagaError
} from "./utils";
import actions from "../actions";

function* signIn(api, action) {
  try {
    // const response = yield call(api.signIn, action.payload);

    const response = {
      status: 200,
      data: {
        user: {
          first_name: "Alexey",
          last_name: "Cherneny",
          id: 1,
          role: "hr"
        },
        token: "ejej"
      }
    };
    debugger;

    if (response.status === 200) {
      yield put(actions.signInSuccess(response.data));
      yield put(actions.setUser(response.data));

      setApiAuthorizationHeader(api, response.data.token);

      saveAuthToken(response.data.token);
      saveUser(response.data.user);

      yield put(replace("/app/cabinet/"));
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while sign in";

    yield handleSagaError(error, errorMessage, actions.signInFailure);
  }
}

function* logout(api) {
  try {
    const response = yield call(api.logout);

    // if (/^200|201$/.test(response.status)) {
    cleanAuthToken();
    cleanUser();

    yield put(actions.logoutSuccess(response.data));
    yield put(actions.resetUser(response.data));
    yield put(replace("/app/sign-in"));
    // } else {
    //   throw response;
    // }
  } catch (error) {
    const errorMessage = "Error while logout";

    yield handleSagaError(error, errorMessage, actions.logoutFailure);
  }
}

function* publicAccess(api, action) {
  try {
    const response = yield call(api.checkPassword, action.payload);

    if (/^200|201$/.test(response.status)) {
      yield put(actions.publicAccessSuccess(true));
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while publicAccess";

    yield handleSagaError(error, errorMessage, actions.publicAccessFailure);
  }
}

function* saveFCMToken(api, action) {
  try {
    const response = yield call(api.saveFCM, action.payload);

    if (response.status === 200) {
      yield put(actions.saveFCMTokenSuccess(response.data));
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while saving fcm";

    yield handleSagaError(error, errorMessage, actions.saveFCMTokenFailure);
  }
}

export default { signIn, logout, publicAccess, saveFCMToken };
