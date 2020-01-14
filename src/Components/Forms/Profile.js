import React from "react";
import { Form, Input, Button, Col, Row, Select } from "antd";
import { get } from "lodash";

import Avatar from "../FormElements/Avatar/Avatar";

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
    const { initialValues, form, isUpdating, disabled } = this.props;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "375"
    })(
      <Select style={{ width: 70 }}>
        <Select.Option value="375">375</Select.Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Row gutter={16} type="flex" justify="center">
          <Col>
            <Avatar
              form={form}
              name="avatar"
              settings={{
                initialValue: get(initialValues, "avatar.url", null)
              }}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Имя" style={{ marginBottom: 8 }}>
              {getFieldDecorator("first_name", {
                rules: [{ required: true, message: "Пожалуйста, введите имя" }],
                initialValue: get(initialValues, "first_name", "")
              })(
                <Input
                  placeholder="Пожалуйста, введите имя"
                  disabled={disabled}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Фамилия" style={{ marginBottom: 8 }}>
              {getFieldDecorator("last_name", {
                rules: [
                  { required: true, message: "Пожалуйста, введите фамилию" }
                ],
                initialValue: get(initialValues, "last_name", "")
              })(
                <Input
                  placeholder="Пожалуйста, введите фамилию"
                  disabled={disabled}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Отчество" style={{ marginBottom: 8 }}>
              {getFieldDecorator("middle_name", {
                rules: [
                  { required: true, message: "Пожалуйста, введите отчество" }
                ],
                initialValue: get(initialValues, "middle_name", "")
              })(
                <Input
                  placeholder="Пожалуйста, введите отчество"
                  disabled={disabled}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Телефон" style={{ marginBottom: 8 }}>
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Пожалуйста, введите номер телефона"
                  }
                ],
                initialValue: get(initialValues, "phone", "")
              })(
                <Input
                  placeholder="Пожалуйста, введите номер телефона"
                  disabled={disabled}
                  addonBefore={prefixSelector}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Skype" style={{ marginBottom: 8 }}>
              {getFieldDecorator("skype", {
                initialValue: get(initialValues, "skype", "")
              })(
                <Input
                  placeholder="Пожалуйста, введите skype"
                  disabled={disabled}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Github" style={{ marginBottom: 8 }}>
              {getFieldDecorator("github", {
                initialValue: get(initialValues, "github", "")
              })(
                <Input
                  placeholder="Пожалуйста, введите github"
                  disabled={disabled}
                  addonBefore="Http://"
                  addonAfter=".com"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Резюме" style={{ marginBottom: 8 }}>
              {getFieldDecorator("link_to_cv", {
                initialValue: get(initialValues, "link_to_cv", "")
              })(
                <Input
                  placeholder="Пожалуйста, введите url резюме"
                  disabled={disabled}
                  addonBefore="Http://"
                  addonAfter=".com"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type="flex" justify="center" style={{ marginTop: 20 }}>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
              loading={isUpdating}
            >
              Обновить
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({ name: "profile_form" })(LoginForm);
