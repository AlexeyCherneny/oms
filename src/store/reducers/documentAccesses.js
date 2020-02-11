import { createCRUDReducer, CRUDState } from './utils';
import { createReducer } from "redux-act";

import actions from "../actions";

const documentAccessReducer = createReducer({
  ...createCRUDReducer("documentAccess", {
    onCreateDataMap: (data, payload) => [...data, ...payload],
    onUpdateDataMap: (data, payload) => data.map(item => item.uuid !== payload.uuid ? item : payload),
    onDeleteDataMap: (data, id) => data.filter(item => item.uuid !== id),
  }),
  [actions.selectDocument]: state => ({
    ...state,
    data: []
  })
}, CRUDState);

export default documentAccessReducer;
