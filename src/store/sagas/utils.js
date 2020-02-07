// import { Sentry } from "react-native-sentry";
import { put } from "redux-saga/effects";
import { get } from "lodash";

export function* handleSagaError(error, errorMessage, failureAction, payload) {
  try {
    yield put(failureAction(payload));

    handleError(error, errorMessage);
  } catch (error) {
    const errorMessage = "Error while handle saga error";
    handleError(error, errorMessage);
  }
}

export function handleError(error, errorMessage) {
  try {
    // Sentry.captureException(errorMessage);
    // Sentry.captureException(error);

    console.warn(errorMessage, error);
  } catch (error) {
    const errorMessage = "Error while handle error";
    console.warn(errorMessage, error);
  }
}

export const saveAuthToken = authToken => {
  try {
    localStorage.setItem("authToken", authToken);
  } catch (error) {
    const errorMessage = "Error while saving auth token to local storage";
    handleError(error, errorMessage);
  }
};

export const getAuthToken = () => {
  try {
    const authToken = localStorage.getItem("authToken");
    return authToken;
  } catch (error) {
    const errorMessage = "Error while getting auth token to local storage";
    handleError(error, errorMessage);
  }
};

export const cleanAuthToken = () => {
  try {
    localStorage.setItem("authToken", "");
  } catch (error) {
    const errorMessage = "Error while getting auth token to local storage";
    handleError(error, errorMessage);
  }
};

export const saveUser = user => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    const errorMessage = "Error while saving user to local storage";
    handleError(error, errorMessage);
  }
};

export const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  } catch (error) {
    const errorMessage = "Error while getting user to local storage";
    handleError(error, errorMessage);
  }
};

export const cleanUser = () => {
  try {
    localStorage.setItem("user", "");
    localStorage.removeItem("settings");
  } catch (error) {
    const errorMessage = "Error while cleaning user to local storage";
    handleError(error, errorMessage);
  }
};

export const setApiAuthorizationHeader = (api, authToken) => {
  try {
    api.data.setHeader("token", authToken);
  } catch (error) {
    const errorMessage = "Error while setting api authorization header";
    handleError(error, errorMessage);
  }
};

export const saveSettings = settings => {
  try {
    localStorage.setItem("settings", JSON.stringify(settings));
  } catch (error) {
    const errorMessage = "Error while saving user settings to local storage";
    handleError(error, errorMessage);
  }
};

export const loadSettings = () => {
  try {
    const settings = JSON.parse(localStorage.getItem("settings"));
    return settings;
  } catch (error) {
    const errorMessage = "Error while loading user settings to local storage";
    handleError(error, errorMessage);
    return null;
  }
};

export const spreadAction = action => {
  try {
    const payload = get(action, "payload", {});

    const onSuccess = get(action, "payload.meta.onSuccess", () => {});
    const onFailure = get(action, "payload.meta.onFailure", () => {});

    return { payload, onSuccess, onFailure };
  } catch (err) {
    console.log("Error while spreading action", err);
    return {};
  }
};

export const testResponse = ({ status }) => /200|201|204/.test(status);
