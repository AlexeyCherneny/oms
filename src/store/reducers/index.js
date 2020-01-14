import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createReducer } from "redux-act";

import { createCRUDReducer, CRUDState } from "./utils";

import authorizationReducer from "./authorization";
import applicationReducer from "./application";
import usersPlanReducer from "./usersPlan";
import eventsReducer from "./events";
import paymentsReducer from "./payments";
import documentsReducer from "./documents";

const usersReducer = createReducer(createCRUDReducer("user"), CRUDState);
const salariesReducer = createReducer(createCRUDReducer("salary"), CRUDState);

const createRootReducer = history =>
  combineReducers({
    application: applicationReducer,
    authorization: authorizationReducer,
    users: usersReducer,
    events: eventsReducer,
    salaries: salariesReducer,
    payments: paymentsReducer,
    documents: documentsReducer,

    usersPlan: usersPlanReducer,
    router: connectRouter(history)
  });

export default createRootReducer;
