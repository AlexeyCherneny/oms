import { createAction } from "redux-act";

export const initializeApplicationRequest = createAction(
  "INITIALIZE_APPLICATION_REQUEST"
);
export const initializeApplicationSuccess = createAction(
  "INITIALIZE_APPLICATION_SUCCESS"
);
export const initializeApplicationFailure = createAction(
  "INITIALIZE_APPLICATION_FAILURE"
);

export default {
  initializeApplicationRequest,
  initializeApplicationSuccess,
  initializeApplicationFailure
};
