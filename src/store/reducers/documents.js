import { createCRUDReducer, CRUDState } from './utils';
import { createReducer } from "redux-act";

import actions from "../actions";

const documentsState = {
  ...CRUDState,
  currentDocument: null,
}

const documentsReducer = createReducer({
  ...createCRUDReducer("document", { 
    onUpdateDataMap: (data, payload) => data.map(item => item.id !== payload.id ? item : payload),
    onDeleteDataMap: (data, id) => data.filter(item => item.id !== id),
  }),
  [actions.setCurrentDocument]: (state, payload) => ({ 
    ...state, 
    currentDocument: payload 
  }),
  [actions.editCurrentDocument]: (state, payload) => ({ 
    ...state, 
    currentDocument: { 
      ...state.currentDocument, 
      ...payload 
    }
  }),
}, documentsState);

export default documentsReducer;
