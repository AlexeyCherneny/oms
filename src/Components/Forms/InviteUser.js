import React from "react";
import { Form, Icon, Input, Button, Row, Col, DatePicker } from "antd";
import Moment from 'moment';

import Avatar from "../FormElements/Avatar/Avatar";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
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
    const { initialValues = {}, form, isLoading = false } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16} type="flex" justify="center" style={{ marginBottom: 20 }}>
          <Col>
            <Avatar
              form={form}
              name="avatar"
              settings={{ initialValue: initialValues.avatar }}
            />
          </Col>
        </Row>
        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Пожалуйста, введите email пользователя"
              }
            ]
          })(
            <Input
              suffix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="example@mail.com"
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Фамилия">
          {getFieldDecorator("last_name", {
            rules: [
              { required: true, message: "Пожалуйста, введите фамилию" }
            ],
            initialValue: initialValues.last_name
          })(
            <Input
              placeholder="Фамилия"
              suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              disabled={isLoading}
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Имя">
          {getFieldDecorator("first_name", {
            rules: [{ required: true, message: "Пожалуйста, введите имя" }],
            initialValue: initialValues.first_name
          })(
            <Input
              placeholder="Имя"
              suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              disabled={isLoading}
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Отчество">
          {getFieldDecorator("middle_name", {
            rules: [
              { required: true, message: "Пожалуйста, введите отчество" }
            ],
            initialValue: initialValues.middle_name
          })(
            <Input
              placeholder="Отчество"
              suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              disabled={isLoading}
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Дата рождения">
          {getFieldDecorator("birthday", {
            initialValue: Moment(initialValues.birthday)
          })(
            <DatePicker 
              suffixIcon={<Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />}
              disabled={isLoading} 
              style={{ width: '100%' }} 
            />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Пригласить
        </Button>
      </Form>
    );
  }
}

export default Form.create({ name: "login_form" })(LoginForm);
