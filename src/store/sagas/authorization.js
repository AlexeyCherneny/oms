import { call, put } from "redux-saga/effects";
import { replace } from "connected-react-router";
import qs from "qs";

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
    const authResponse = yield call(api.signIn, qs.stringify(action.payload));

    if (authResponse.status === 200) {
      const { token, uuid } = authResponse.data.data;
      setApiAuthorizationHeader(api, token);
      saveAuthToken(token);

      const userResponse = yield call(api.readUser, uuid);
      if (userResponse.status === 200) {
        const { data: user } = userResponse.data;

        yield put(actions.signInSuccess());
        yield put(actions.setUser({ user }));

        saveUser(user);
      } else {
        throw userResponse;
      }

      yield put(replace("/app/cabinet/"));
    } else {
      throw authResponse;
    }
  } catch (error) {
    const errorMessage = "Error while sign in";

    yield handleSagaError(error, errorMessage, actions.signInFailure);
  }
}

function* logout(api) {
  try {
    cleanAuthToken();
    cleanUser();

    yield put(actions.logoutSuccess());
    yield put(actions.resetUser());
    yield put(replace("/app/sign-in"));
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
