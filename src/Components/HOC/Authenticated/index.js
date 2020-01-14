import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

export default function authorized(ProtectedComponent) {
  class Authenticated extends React.Component {
    componentDidMount() {
      const { history, user } = this.props;

      if (!user) {
        history.replace("/app/sign-in");
      }
    }

    componentDidUpdate() {
      const { history, user } = this.props;

      if (!user) {
        history.replace("/app/sign-in");
      }
    }

    render() {
      const { user } = this.props;

      if (!user) {
        return null;
      }

      return <ProtectedComponent {...this.props} />;
    }
  }

  const mapState = ({ authorization }) => ({ user: authorization.user });

  return compose(withRouter, connect(mapState))(Authenticated);
}
