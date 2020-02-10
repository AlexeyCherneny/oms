import React from "react";
import { Form, Button, DatePicker, Select, Input } from "antd";
import { get } from "lodash";
import moment from "moment";

import {
  displayDateFormat,
  programDateFormat
} from "../../services/formatters";
import { connect } from "react-redux";

const formItemLayout = {
  style: { marginBottom: 0 }
};

const inputs = initialValues => ({
  date: {
    name: "date",
    placeholder: "Дата",
    format: [displayDateFormat],
    settings: {
      initialValue: get(initialValues, "date", "")
        ? moment(get(initialValues, "date", ""), programDateFormat)
        : null,
      rules: [{ required: true, message: "Обязательное поле" }]
    },
    style: { width: "100%" }
  },
  userId: {
    name: "userId",
    placeholder: "Пользователь",
    settings: {
      initialValue: get(initialValues, "userId", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  workHours: {
    name: "workHours",
    placeholder: "Рабочие часы",
    settings: {
      initialValue: get(initialValues, "workHours", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  overtimeHours: {
    name: "overtimeHours",
    placeholder: "Переработанные часы",
    settings: {
      initialValue: get(initialValues, "overtimeHours", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  }
});

class Project extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, handleSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit(values);
      }
    });
  };

  render() {
    const {
      initialValues = {},
      form,
      isLoading,
      handleSubmit,
      handleReject,
      users
    } = this.props;

    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Дата">
          {getFieldDecorator(
            inputs(initialValues).date.name,
            inputs(initialValues).date.settings
          )(
            <DatePicker {...inputs(initialValues).date} disabled={isLoading} />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Пользователь">
          {getFieldDecorator(
            inputs(initialValues).userId.name,
            inputs(initialValues).userId.settings
          )(
            <Select
              {...inputs(initialValues).userId}
              disabled={isLoading}
              options={users.map(user => ({
                label: `${user.firstName[0]}. ${user.lastName}`,
                value: String(user.uuid)
              }))}
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Рабочие часы">
          {getFieldDecorator(
            inputs(initialValues).workHours.name,
            inputs(initialValues).workHours.settings
          )(
            <Input {...inputs(initialValues).workHours} disabled={isLoading} />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Переработанные часы">
          {getFieldDecorator(
            inputs(initialValues).overtimeHours.name,
            inputs(initialValues).overtimeHours.settings
          )(
            <Input
              {...inputs(initialValues).overtimeHours}
              disabled={isLoading}
            />
          )}
        </Form.Item>

        <div
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        >
          {handleReject && (
            <Button
              loading={isLoading}
              style={{ marginRight: 10 }}
              onClick={handleReject}
            >
              {this.props.rejectTitle}
            </Button>
          )}
          {handleSubmit && (
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {this.props.submitTitle}
            </Button>
          )}
        </div>
      </Form>
    );
  }
}

export default connect(state => ({ users: state.users.data || [] }))(
  Form.create({ name: "project" })(Project)
);
