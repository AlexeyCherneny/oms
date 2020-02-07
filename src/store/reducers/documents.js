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
    onDeleteDataMap: (data, id) => data.filter(item => item.uuid !== id),

    // match: (i1, i2) => i1.id === i2.id,
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
