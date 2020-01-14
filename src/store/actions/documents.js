import { createAction } from "redux-act";

export const documentsListRequest = createAction("DOCUMENTS_LIST_REQUEST");
export const documentsListSuccess = createAction("DOCUMENTS_LIST_SUCCESS");
export const documentsListFailure = createAction("DOCUMENTS_LIST_FAILURE");

export const updateListRequest = createAction("UPDATE_DOCUMENTS_LIST_REQUEST");
export const updateListSuccess = createAction("UPDATE_DOCUMENTS_LIST_SUCCESS");
export const updateListFailure = createAction("UPDATE_DOCUMENTS_LIST_FAILURE");

export default {
  documentsListRequest,
  documentsListSuccess,
  documentsListFailure,
  updateListRequest,
  updateListSuccess,
  updateListFailure,
};
