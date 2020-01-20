import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const withRole = ({
  allowedRoles = [],
  defaultUrl = "/app/cabinet",
  redirect = true
} = {}) => WrappedComponent => {
  class WithRoleComponent extends React.PureComponent {
    componentDidMount() {
      this.checkRole();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.user.role !== this.props.user.role) this.checkRole();
    }

    get isAllowedRole() {
      const { roles } = this.props.user;
      return Boolean(roles.find(role => allowedRoles.includes(role)));
    }

    checkRole = () => {
      if (!this.isAllowedRole && redirect) {
        this.props.history.push(defaultUrl);
      }
    };

    render() {
      const { user } = this.props;
      if (!this.isAllowedRole) {
        return null;
      }
      return <WrappedComponent {...this.props} user={user} />;
    }
  }

  const mapState = ({ authorization }) => ({
    user: authorization.user || {}
  });

  return compose(withRouter, connect(mapState))(WithRoleComponent);
};

export default withRole;
