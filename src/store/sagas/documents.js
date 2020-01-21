import { put, call } from "redux-saga/effects";

import { handleSagaError } from "./utils";
import actions from "../actions";

function* readDocuments(api) {
  try {
    const response = yield call(api.readDocuments);
    // tree.getTreeFormArr(documents)
    if (response.status === 200) {
      yield put(actions.documentsSuccess(response.data.data));
    } else {
      throw response;
    }
  } catch (error) {
    const errorMessage = "Error while fetching documents list";

    yield handleSagaError(error, errorMessage, actions.documentsFailure);
  }
}

export default {
  readDocuments
};
