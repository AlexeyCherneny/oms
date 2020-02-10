import { createCRUDReducer, CRUDState } from './utils';
import { createReducer } from "redux-act";
import actions from '../actions';

const projectWorkReducer = createReducer({
  ...createCRUDReducer("projectWork", {
    onCreateDataMap: (data, payload) => [...data, ...payload],
    onUpdateDataMap: (data, payload) => data.map(item => item.uuid === payload.uuid ? payload : item),
    onDeleteDataMap: (data, payload) => data.filter(item => item.uuid !== payload),
  }),
  [actions.cleanProjectWork]: state => ({ ...state, data: []}),
}, CRUDState );

export default projectWorkReducer;
