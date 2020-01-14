import React from "react";
import { Switch, Route } from "react-router-dom";
import { get } from "lodash";

import { connect } from "react-redux";

import actions from "../store/actions";

import { SignIn, ApplicationLoader } from "../pages";
import Cabinet from "./Cabinet";

class Routes extends React.Component {
  componentDidMount() {
    this.props.initializeApplication();
  }

  render() {
    const { initializing } = this.props;
    if (initializing.isLoading) {
      return <ApplicationLoader />;
    }

    if (!initializing.isLoaded || initializing.isError) {
      return null;
    }

    return (
      <Switch>
        <Route exact path="/app/sign-in" component={SignIn} />

        <Route path="/app/cabinet" component={Cabinet} />
      </Switch>
    );
  }
}

const mapState = ({ application }) => ({
  initializing: get(application, "initializing", null)
});

const mapDispatch = {
  initializeApplication: actions.initializeApplicationRequest
};

export default connect(mapState, mapDispatch)(Routes);
