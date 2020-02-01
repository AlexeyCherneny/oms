import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createReducer } from "redux-act";

import { createCRUDReducer, CRUDState } from "./utils";

import authorizationReducer from "./authorization";
import applicationReducer from "./application";
import usersPlanReducer from "./usersPlan";
import eventsReducer from "./events";
import paymentsReducer from "./payments";
import documentReducer from "./documents";
import modalReducer from "./modal";

const userReducer = createReducer(createCRUDReducer("user"), CRUDState);
const salaryReducer = createReducer(createCRUDReducer("salary"), CRUDState);
const projectReducer = createReducer(createCRUDReducer("project"), CRUDState);
const projectWorkReducer = createReducer(
  createCRUDReducer("projectWork"),
  CRUDState
);
const projectRateReducer = createReducer(
  createCRUDReducer("projectRate"),
  CRUDState
);

const createRootReducer = history =>
  combineReducers({
    application: applicationReducer,
    authorization: authorizationReducer,
    users: userReducer,
    events: eventsReducer,
    salaries: salaryReducer,
    payments: paymentsReducer,
    documents: documentReducer,
    projects: projectReducer,
    modal: modalReducer,
    usersPlan: usersPlanReducer,
    projectWorks: projectWorkReducer,
    projectRate: projectRateReducer,

    router: connectRouter(history)
  });

export default createRootReducer;
