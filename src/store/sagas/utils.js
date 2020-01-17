// import { Sentry } from "react-native-sentry";
import { put } from "redux-saga/effects";

export function* handleSagaError(error, errorMessage, failureAction) {
  try {
    yield put(failureAction());

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
