import React from "react";
import { Form, Button } from "antd";
import { get } from "lodash";
import moment from "moment";

import {
  displayDateFormat,
  programDateFormat
} from "../../services/formatters";
import FormDatepicker from "../FormElements/Datepicker/Datepicker";
import FormSelect from "../FormElements/Select/Select";
import FormInput from "../FormElements/Input/Input";
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

    console.log("users: ", users);
    console.log(
      "users1: ",
      users.map(user => ({
        label: `${user.firstName[0]}. ${user.lastName}`,
        value: String(user.uuid)
      }))
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Дата">
          <FormDatepicker
            form={form}
            {...inputs(initialValues).date}
            disabled
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Пользователь">
          <FormSelect
            form={form}
            {...inputs(initialValues).userId}
            disabled
            options={users.map(user => ({
              label: `${user.firstName[0]}. ${user.lastName}`,
              value: String(user.uuid)
            }))}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Рабочие часы">
          <FormInput
            form={form}
            {...inputs(initialValues).workHours}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Переработанные часы">
          <FormInput
            form={form}
            {...inputs(initialValues).overtimeHours}
            disabled={isLoading}
          />
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
