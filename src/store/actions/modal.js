import { createAction } from "redux-act";

export const openModal = createAction("OPEN_MODAL");
export const hideModal = createAction("HIDE_MODAL");

export const confirmModal = createAction("CONFIRM_MODAL");
export const declineModal = createAction("DECLINE_MODAL");

export const startModalLoading = createAction("START_MODAL_LOADING");
export const stopModalLoading = createAction("STOP_MODAL_LOADING");

export default {
  openModal,
  hideModal,

  confirmModal,
  declineModal,

  startModalLoading,
  stopModalLoading
};
