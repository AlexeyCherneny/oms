import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { get } from "lodash";

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.canSave) {
          localStorage.setItem("saved_user", JSON.stringify({ ...values }));
        }
        this.props.handleSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const savedUser = JSON.parse(localStorage.getItem("saved_user"));

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("email", {
            initialValue: get(savedUser, "email"),
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
            initialValue: get(savedUser, "password"),
            rules: [{ required: true, message: "Пожалуйста, введите email" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Пожалуйста, введите пароль"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("canSave", {
            valuePropName: "canSave"
          })(<Checkbox>Запомнить меня</Checkbox>)}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form>
    );
  }
}

export default Form.create({ name: "login_form" })(LoginForm);
