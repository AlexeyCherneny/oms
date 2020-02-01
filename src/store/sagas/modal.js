import { race, put, all, takeLatest, take } from "redux-saga/effects";
import { get } from "lodash";

import { handleError } from "./utils";
import actions from "../actions";

function* closeModal(api, action) {
  try {
    const onStart = get(action, "payload.meta.start");
    const onSuccess = get(action, "payload.meta.success");
    const onFailure = get(action, "payload.meta.failure");

    let repeat = true;

    while (repeat) {
      const { confirmAction } = yield race({
        confirmAction: take(actions.confirmModal),
        declineAction: take(actions.declineModal)
      });

      if (confirmAction) {
        yield put(onStart(confirmAction.payload));

        if (onSuccess || onFailure) {
          yield put(actions.startModalLoading());

          const { successAction } = yield race({
            successAction: take(onSuccess),
            failureAction: take(onFailure)
          });

          yield put(actions.stopModalLoading());

          if (successAction) {
            yield put(actions.hideModal());
          }
        }
      } else {
        repeat = false;
      }
    }

    yield put(actions.hideModal());
  } catch (error) {
    const errorMessage = "Error while controlling modal";
    handleError(error, errorMessage);
  }
}

export default function*(api) {
  yield all([takeLatest(actions.openModal, closeModal, api)]);
}
