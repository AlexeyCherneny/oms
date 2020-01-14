import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";

import NotAuthenticated from "../../Components/HOC/NotAuthenticated";
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

export default NotAuthenticated(connect(null, mapDispatch)(SignIn));
