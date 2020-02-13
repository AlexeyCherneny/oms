import React from "react";
import { Form, Button, Row, Col, Icon } from "antd";
import { get } from "lodash";
import moment from "moment";

import validators from "../../services/validators/validators";
import { buildRules } from "../../services/validators/utils";
import {
  displayDateFormat,
  programDateFormat
} from "../../services/formatters";
import { Select, Input } from "../FormElements";
import Avatar from "../FormElements/Avatar/Avatar";
import { ROLES } from "../../services/constants";

const formItemLayout = {
  style: { marginBottom: 0 }
};

const roles = [
  { label: "HR", value: ROLES.HR },
  { label: "Пользователь", value: ROLES.EMPLOYEE }
];

const getInputs = initialValues => ({
  roles: {
    name: "roles",
    placeholder: "Пользователь",
    itemProps: {
      ...formItemLayout,
      label: "Роль"
    },
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
    itemProps: {
      ...formItemLayout,
      label: "Email"
    },
    settings: {
      initialValue: get(initialValues, "email", ""),
      rules: buildRules([
        validators.validateEmailFormat,
        validators.validateRequired
      ])
    }
  },
  phone: {
    name: "phone",
    placeholder: "+375296878112",
    suffix: <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />,
    itemProps: {
      ...formItemLayout,
      label: "Номер телефона"
    },
    settings: {
      initialValue: get(initialValues, "phone", ""),
      rules: buildRules([
        validators.validatePhoneFormat,
        validators.validateRequired
      ]),
      normalize: (value, prevValue = []) => {
        console.log("normalize");
        return value;
      },
      format: () => {
        console.log("format");
      }
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

class User extends React.Component {
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

    const inputs = getInputs(initialValues);

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

        <Select
          form={form}
          options={roles}
          {...inputs.roles}
          disabled={isLoading}
        />

        <Input form={form} {...inputs.email} disabled={isLoading} />

        <Input form={form} {...inputs.phone} disabled={isLoading} />

        {/*

        <Form.Item {...formItemLayout} label="Номер телефона">
          {getFieldDecorator(
            inputs.phone.name,
            inputs.phone.settings
          )(<Input {...inputs.phone} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Фамилия">
          {getFieldDecorator(
            inputs.lastName.name,
            inputs.lastName.settings
          )(<Input {...inputs.lastName} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Имя">
          {getFieldDecorator(
            inputs.firstName.name,
            inputs.firstName.settings
          )(<Input {...inputs.firstName} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Отчество">
          {getFieldDecorator(
            inputs.middleName.name,
            inputs.middleName.settings
          )(<Input {...inputs.middleName} disabled={isLoading} />)}
        </Form.Item>

        <Form.Item label="Дата рождения">
          {getFieldDecorator(
            inputs.birthday.name,
            inputs.birthday.settings
          )(<DatePicker {...inputs.birthday} disabled={isLoading} />)}
        </Form.Item> */}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {this.props.submitTitle}
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "login_form" })(User);
