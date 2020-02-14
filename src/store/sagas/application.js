import { call, put, all, takeLatest } from "redux-saga/effects";
import { replace } from "connected-react-router";

import { handleSagaError } from "./utils";
import actions from "../actions";

import {
  getAuthToken,
  getUser,
  cleanAuthToken,
  cleanUser,
  setApiAuthorizationHeader,
  loadSettings
} from "./utils";

function* initializeApplication(api, action) {
  try {
    const token = getAuthToken();
    if (!token) {
      yield put(replace("/app/sign-in"));
      yield put(actions.initializeApplicationSuccess());

      return;
    }

    const user = getUser();
    if (!user) {
      yield put(replace("/app/sign-in"));
      yield put(actions.initializeApplicationSuccess());

      return;
    }

    setApiAuthorizationHeader(api, token);

    const response = yield call(api.readUser, user.uuid);

    if (response.status === 200) {
      yield put(actions.setUser({ user: response.data.data }));

      yield put(actions.usersRequest());
      yield put(actions.readMySalaryRequest());

      const settings = loadSettings();
      yield put(actions.setUserSettings(settings));

      yield put(actions.initializeApplicationSuccess());
    } else if (response.status === 401) {
      cleanAuthToken();
      cleanUser();

      yield put(replace("/app/sign-in"));

      yield put(actions.initializeApplicationSuccess());
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while initializing application";

    yield handleSagaError(
      error,
      errorMessage,
      actions.initializeApplicationFailure
    );
  }
}

// function* initializeFirebase(api, action) {
//   try {
//     const token = getAuthToken();
//     if (!token) {
//       yield put(replace("/app/sign-in"));
//       yield put(actions.initializeApplicationSuccess());

//       return;
//     }

//     const user = getUser();
//     if (!user) {
//       yield put(replace("/app/sign-in"));
//       yield put(actions.initializeApplicationSuccess());

//       return;
//     }

//     setApiAuthorizationHeader(api, token);

//     const response = yield call(api.fetchUser, user.uuid);

//     if (response.status === 200) {
//       yield put(actions.setUser({ user: response.data }));

//       yield delay(1000);
//       yield put(actions.initializeApplicationSuccess());
//     } else if (response.status === 401) {
//       cleanAuthToken();
//       cleanUser();

//       yield put(replace("/app/sign-in"));

//       yield put(actions.initializeApplicationSuccess());
//     } else {
//       throw response;
//     }
//   } catch (error) {
//     const errorMessage = "Error while initializing application";

//     yield handleSagaError(
//       error,
//       errorMessage,
//       actions.initializeApplicationFailure
//     );
//   }
// }

export default function*(api) {
  yield all([
    takeLatest(actions.initializeApplicationRequest, initializeApplication, api)
  ]);
}
