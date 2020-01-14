import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Router } from "react-router-dom";
import moment from "moment";

import history from "./services/history";
import { store } from "./store";
import Navigation from "./Navigation/App";

import "./services/firebase";

import "antd/dist/antd.css";
// import "ant-design-pro/dist/ant-design-pro.css";

moment.locale("ru");

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router history={history}>
        <Navigation />
      </Router>
    </ConnectedRouter>
  </Provider>
);

export default App;
