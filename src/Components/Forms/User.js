import React from "react";
import { Form, Button, Row, Col, Icon } from "antd";
import { get } from "lodash";
import moment from "moment";

import FormInput from "../FormElements/Input/Input";
import FormSelect from "../FormElements/Select/Select";
import FormDatepicker from "../FormElements/Datepicker/Datepicker";
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
      initialValue: get(initialValues, "roles", []),
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
      initialValue: get(initialValues, "last_name", ""),
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
      initialValue: get(initialValues, "first_name", ""),
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
      initialValue: get(initialValues, "middle_name", "")
    }
  },
  birthday: {
    name: "birthday",
    placeholder: "01.04.1997",
    format: [displayDateFormat],
    suffixIcon: <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />,
    style: { width: "100%" },
    settings: {
      initialValue: get(initialValues, "birthday", "")
        ? moment(initialValues.birthday, "DD/MM/YYYY")
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
          <FormSelect
            form={form}
            {...inputs(initialValues).roles}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Email">
          <FormInput
            form={form}
            {...inputs(initialValues).email}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Номер телефона">
          <FormInput
            form={form}
            {...inputs(initialValues).phone}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Фамилия">
          <FormInput
            form={form}
            {...inputs(initialValues).lastName}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Имя">
          <FormInput
            form={form}
            {...inputs(initialValues).firstName}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Отчество">
          <FormInput
            form={form}
            {...inputs(initialValues).middleName}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item label="Дата рождения">
          <FormDatepicker
            form={form}
            {...inputs(initialValues).birthday}
            disabled={isLoading}
          />
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
