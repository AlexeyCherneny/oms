import React from "react";
import { Form, Icon, Input, Button } from "antd";

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Пожалуйста, введите email" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Пожалуйста, введите email"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Пожалуйста, введите email" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Пожалуйста, введите пароль"
            />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form>
    );
  }
}

export default Form.create({ name: "login_form" })(LoginForm);
