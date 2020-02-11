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
import documentAccessReducer from "./documentAccesses";
import projectWorkReducer from "./projectWork";

const userReducer = createReducer(createCRUDReducer("user"), CRUDState);
const salaryReducer = createReducer(createCRUDReducer("salary"), CRUDState);
const projectReducer = createReducer(createCRUDReducer("project", {
  onUpdateDataMap: (data, payload) => data.map(item => item.uuid === payload.uuid ? payload : item),
  onDeleteDataMap: (data, payload) => data.filter(item => item.uuid !== payload),
}), CRUDState);

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
    documentAccesses: documentAccessReducer,

    usersPlan: usersPlanReducer,
    projectWorks: projectWorkReducer,

    router: connectRouter(history)
  });

export default createRootReducer;
