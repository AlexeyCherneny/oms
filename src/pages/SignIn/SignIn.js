import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Row, Col } from "antd";

import { NotAuthenticated } from "../../Components/HOC";
import LoginForm from "../../Components/Forms/LoginForm";
import actions from "../../store/actions";

const SignIn = props => (
  <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
    <Col span={8}>
      <LoginForm handleSubmit={props.signIn} />
    </Col>
  </Row>
);

const mapDispatch = {
  signIn: actions.signInRequest
};

export default compose(
  NotAuthenticated,
  connect(null, mapDispatch),
)(SignIn);
