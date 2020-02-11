import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";

import history from "../services/history";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";
import actions from "./actions";

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);

const middleWares = applyMiddleware(sagaMiddleware, routerMiddleware);

const enhancers = compose(
  middleWares,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

const appReducer = createRootReducer(history);

const rootReducer = (state, action) => {
  if (action.type === actions.resetUser.toString()) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

const configureStore = () => {
  let store = createStore(rootReducer, enhancers);

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = configureStore();

export { store };
