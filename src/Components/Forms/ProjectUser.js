import React from "react";
import { Form, Button, Row, Col } from "antd";
import { get } from "lodash";
import Moment from "moment";

import { DatePicker, Select, InputNumber } from "../FormElements";
import { getShortName } from "../../services/formatters";
import { DATE_FORMATS } from "../../services/constants";

import 'moment/locale/ru';

const formItemLayout = {
  style: { marginBottom: 0 }
};

const getInputs = (initialValues = {}) => ({
  date: {
    name: "date",
    placeholder: "Дата",
    format: [DATE_FORMATS.monthString],
    settings: {
      initialValue: get(initialValues, "date", "")
        ? Moment(get(initialValues, "date", ""))
        : null,
      rules: [{ required: true, message: "Обязательное поле" }]
    },
    itemProps: {
      ...formItemLayout,
      label: "Дата"
    },
    disabled: initialValues.isLoading,
    style: { width: "100%" }
  },
  users: {
    name: "users",
    placeholder: "Сотрудники",
    mode: "multiple",
    settings: {
      rules: [{ required: true, message: "Обязательное поле" }]
    },
    itemProps: {
      ...formItemLayout,
      label: "Сотрудники"
    },
    disabled: initialValues.isLoading,
  },
  workRate: {
    name: "workRate",
    placeholder: "Часовая ставка",
    settings: {
      initialValue: get(initialValues, "workRate", 0),
    },
    itemProps: {
      ...formItemLayout,
      label: "Часовая ставка"
    },
    disabled: initialValues.isLoading,
  },
  overtimeRate: {
    name: "overtimeRate",
    placeholder: "Cтавка переработки",
    settings: {
      initialValue: get(initialValues, "overtimeRate", 0),
    },
    itemProps: {
      ...formItemLayout,
      label: "Cтавка переработки"
    },
    disabled: initialValues.isLoading,
  }
});

class Project extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, handleSubmit, initialValues } = this.props;

    form.validateFields((err, { users, ...values }) => {
      if (!err) {
        const date = Moment(values.date).startOf('month').format(DATE_FORMATS.dashReverse);
        const extra = { ...initialValues, ...values, date };
        const formData = users.map(userId => ({ ...extra, userId }));
        handleSubmit(formData);
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

    const userData = users.map(user => ({
      label: getShortName(user),
      value: String(user.uuid)
    }))

    const inputs = getInputs(initialValues);

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: -20 }}>
        <DatePicker
          form={form}
          {...inputs.date}
        />

        <Select
          form={form}
          options={userData}
          {...inputs.users}
        />

        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              form={form}
              {...inputs.workRate}
              positive
              float
            />
          </Col>
          <Col span={12}>
            <InputNumber
              form={form}
              {...inputs.overtimeRate}
              positive
              float
            />
          </Col>
        </Row>

        <div
          style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
        >
          {handleReject && (
            <Button
              disabled={isLoading}
              style={{ marginRight: 10 }}
              onClick={handleReject}
            >
              {this.props.rejectTitle}
            </Button>
          )}
          {handleSubmit && (
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
            >
              {this.props.submitTitle}
            </Button>
          )}
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "project_user" })(Project);
