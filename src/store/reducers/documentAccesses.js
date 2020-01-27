import { createCRUDReducer, CRUDState } from './utils';
import { createReducer } from "redux-act";

import actions from "../actions";

const documentAccessReducer = createReducer({
  ...createCRUDReducer("documentAccess", {
    onCreateDataMap: (data, payload) => [...data, ...payload],
    onUpdateDataMap: (data, payload) => data.map(item => item.id !== payload.id ? item : payload),
    onDeleteDataMap: (data, id) => data.filter(item => item.id !== id),
  }),
  [actions.selectDocument]: state => ({
    ...state,
    data: []
  })
}, CRUDState);

export default documentAccessReducer;
