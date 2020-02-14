import { createCRUDReducer, CRUDState } from './utils';
import { createReducer } from "redux-act";

import actions from "../actions";

const documentsState = {
  ...CRUDState,
  selectedDocument: null,
  editedDocument: {},
}

const documentsReducer = createReducer({
  ...createCRUDReducer("document", { 
    onUpdateDataMap: (data, payload) => data.map(item => item.uuid !== payload.uuid ? item : payload),
    onDeleteDataMap: (data, uuid) => data.filter(item => item.uuid !== uuid),

    // match: (i1, i2) => i1.uuid === i2.uuid,
  }),
  [actions.selectDocument]: (state, payload) => ({ 
    ...state, 
    selectedDocument: payload,
    editedDocument: {},
  }),
  [actions.editSelectedDocument]: (state, payload) => ({
    ...state,
    editedDocument: {
      ...state.editedDocument,
      ...payload
    }
  }),
  [actions.resetEditDocument]: state => ({
    ...state,
    editedDocument: {}
  }),
}, documentsState);

export default documentsReducer;
