import { call, put,  select, takeLatest, all } from "redux-saga/effects";
import { get } from 'lodash';
import { replace } from "connected-react-router";
import qs from "qs";

import {
  setApiAuthorizationHeader,
  saveAuthToken,
  cleanAuthToken,
  saveUser,
  cleanUser,
  handleSagaError,
  saveSettings,
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
    const email = yield select(state => state.authorization.user.email);
    const requestData = { email, ...action.payload };
    const response = yield call(api.signIn, qs.stringify(requestData));

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

function* updateUserLocalSettings() {
  const settings = yield select(state => get(state, 'authorization.settings', {}));
  saveSettings(settings);
}

export default function*(api) {
  yield all([
    takeLatest(actions.signInRequest, signIn, api),
    takeLatest(actions.logoutRequest, logout, api),
    takeLatest(actions.publicAccessRequest, publicAccess, api),
    takeLatest(actions.saveFCMTokenRequest, saveFCMToken, api),
    takeLatest(actions.setUserSettings, updateUserLocalSettings),
  ]);
}
