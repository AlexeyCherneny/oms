import { createCRUDReducer, CRUDState } from "./utils";
import { createReducer } from "redux-act";

import actions from "../actions";

const reducer = createReducer(
  createCRUDReducer("salary", undefined, {
    [actions.readMySalarySuccess]: state => state,
    [actions.readMySalarySuccess]: (state, payload) => {
      return {
        ...state,
        mySalary: payload
      };
    },
    [actions.readMySalaryFailure]: state => ({
      ...state,
      mySalary: null
    }),

    [actions.setMySalary]: (state, payload) => ({
      ...state,
      mySalary: payload
    }),
    [actions.resetMySalary]: state => ({
      ...state,
      mySalary: null
    })
  }),
  CRUDState
);

export default reducer;
