import React from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "antd";
import { get } from "lodash";
import Moment from "moment";

import { DatePicker, Select, InputNumber } from '../FormElements';
import { getShortName } from "../../services/formatters";
import { DATE_FORMATS } from "../../services/constants";

import 'moment/locale/ru';

const formItemLayout = {
  style: { marginBottom: 0 }
};

const getInputs = initialValues => ({
  date: {
    name: "date",
    placeholder: "Дата",
    format: [DATE_FORMATS.monthString],
    settings: {
      initialValue: get(initialValues, "date", "")
        ? Moment(get(initialValues, "date", ""))
        : null,
    },
    itemProps: {
      ...formItemLayout,
      label: "Дата"
    },
    disabled: true,
    style: { width: "100%" }
  },
  userId: {
    name: "userId",
    placeholder: "Сотрудник",
    settings: {
      initialValue: get(initialValues, "userId", null),
    },
    itemProps: { 
      ...formItemLayout, 
      label: 'Сотрудник',
    },
    disabled: true,
  },
  workHours: {
    name: "workHours",
    placeholder: "Рабочие часы",
    settings: {
      initialValue: get(initialValues, "workHours", 0),
    },
    itemProps: {
      ...formItemLayout,
      label: 'Рабочие часы',
    },
    disabled: initialValues.isLoading,
  },
  overtimeHours: {
    name: "overtimeHours",
    placeholder: "Переработанные часы",
    settings: {
      initialValue: get(initialValues, "overtimeHours", 0),
    },
    itemProps: {
      ...formItemLayout,
      label: 'Переработанные часы',
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
      label: 'Часовая ставка',
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
      label: 'Cтавка переработки',
    },
    disabled: initialValues.isLoading,
  }
});

class Project extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, handleSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit({
          ...values,
          date: Moment(values.date).format(DATE_FORMATS.dashReverse)
        });
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
        <Row gutter={16}>
          <Col span={12}>
            <DatePicker
              form={form}
              {...inputs.date}
            />
          </Col>
          <Col span={12}>
            <Select
              form={form}
              options={userData}
              {...inputs.userId}
            />
          </Col>
        </Row>

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

        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              form={form}
              {...inputs.workHours}
              positive
              float
            />
          </Col>
          <Col span={12}>
            <InputNumber
              form={form}
              {...inputs.overtimeHours}
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

export default connect(state => ({ users: state.users.data || [] }))(
  Form.create({ name: "project" })(Project)
);
