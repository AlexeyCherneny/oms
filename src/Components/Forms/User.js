import React from "react";
import { Form, Button, Row, Col, Icon, Select, Input } from "antd";
import { get } from "lodash";
import moment from "moment";

import {
  displayDateFormat,
  programDateFormat
} from "../../services/formatters";
import Avatar from "../FormElements/Avatar/Avatar";
import { ROLES } from "../../services/constants";

const formItemLayout = {
  style: { marginBottom: 0 }
};

const roles = [
  { label: "HR", value: ROLES.HR },
  { label: "Пользователь", value: ROLES.EMPLOYEE }
];

const inputs = initialValues => ({
  roles: {
    name: "roles",
    mode: "multiple",
    placeholder: "Пользователь",
    options: roles,
    settings: {
      initialValue: Array.isArray(get(initialValues, "roles", []))
        ? get(initialValues, "roles", [])
        : [],
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    }
  },
  email: {
    name: "email",
    placeholder: "a.cherneny@gmail.com",
    suffix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />,
    settings: {
      initialValue: get(initialValues, "email", ""),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    }
  },
  phone: {
    name: "phone",
    placeholder: "+375296878112",
    suffix: <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />,
    settings: {
      initialValue: get(initialValues, "phone", ""),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    }
  },
  lastName: {
    name: "lastName",
    placeholder: "Черненый",
    suffix: <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />,
    settings: {
      initialValue: get(initialValues, "lastName", ""),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    }
  },
  firstName: {
    name: "firstName",
    placeholder: "Алексей",
    suffix: <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />,
    settings: {
      initialValue: get(initialValues, "firstName", ""),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    }
  },
  middleName: {
    name: "middleName",
    placeholder: "Андреевич",
    suffix: <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />,
    settings: {
      initialValue: get(initialValues, "middleName", "")
    }
  },
  birthday: {
    name: "birthday",
    placeholder: "01.04.1997",
    format: [displayDateFormat],
    suffix: <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />,
    style: { width: "100%" },
    settings: {
      initialValue: get(initialValues, "birthday", "")
        ? moment(initialValues.birthday, "YYYY/MM/DD")
        : null,
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  }
});

class CreateUser extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, handleSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const birthday =
          values.birthday && values.birthday.format(programDateFormat);

        handleSubmit({ ...values, birthday });
      }
    });
  };

  render() {
    const { initialValues = {}, form, isLoading } = this.props;

    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row
          gutter={16}
          type="flex"
          justify="center"
          style={{ marginBottom: 20 }}
        >
          <Col>
            <Avatar
              form={form}
              name="photo"
              settings={{ initialValue: initialValues.photo }}
            />
          </Col>
        </Row>

        <Form.Item {...formItemLayout} label="Роль">
          {getFieldDecorator(
            inputs(initialValues).roles.name,
            inputs(initialValues).roles.settings
          )(<Select {...inputs(initialValues).roles} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Email">
          {getFieldDecorator(
            inputs(initialValues).email.name,
            inputs(initialValues).email.settings
          )(<Input {...inputs(initialValues).email} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Номер телефона">
          {getFieldDecorator(
            inputs(initialValues).phone.name,
            inputs(initialValues).phone.settings
          )(<Input {...inputs(initialValues).phone} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Фамилия">
          {getFieldDecorator(
            inputs(initialValues).lastName.name,
            inputs(initialValues).lastName.settings
          )(<Input {...inputs(initialValues).lastName} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Имя">
          {getFieldDecorator(
            inputs(initialValues).firstName.name,
            inputs(initialValues).firstName.settings
          )(
            <Input {...inputs(initialValues).firstName} disabled={isLoading} />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Отчество">
          {getFieldDecorator(
            inputs(initialValues).middleName.name,
            inputs(initialValues).middleName.settings
          )(
            <Input {...inputs(initialValues).middleName} disabled={isLoading} />
          )}
        </Form.Item>

        <Form.Item label="Дата рождения">
          {getFieldDecorator(
            inputs(initialValues).birthday.name,
            inputs(initialValues).birthday.settings
          )(<Input {...inputs(initialValues).birthday} disabled={isLoading}  />)}
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {this.props.submitTitle}
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "login_form" })(CreateUser);
