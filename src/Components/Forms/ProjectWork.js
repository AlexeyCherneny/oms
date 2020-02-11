import React from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row, DatePicker, Select, Input } from "antd";
import { get } from "lodash";
import Moment from "moment";

import { getShortName } from "../../services/formatters";
import { DATE_FORMATS } from "../../services/constants";

import "moment/locale/ru";

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
      rules: [{ required: true, message: "Обязательное поле" }]
    },
    style: { width: "100%" }
  },
  userId: {
    name: "userId",
    placeholder: "Сотрудник",
    settings: {
      initialValue: get(initialValues, "userId", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  workHours: {
    name: "workHours",
    placeholder: "Рабочие часы",
    settings: {
      initialValue: get(initialValues, "workHours", 0)
    }
  },
  overtimeHours: {
    name: "overtimeHours",
    placeholder: "Переработанные часы",
    settings: {
      initialValue: get(initialValues, "overtimeHours", 0)
    }
  },
  workRate: {
    name: "workRate",
    placeholder: "Часовая ставка",
    settings: {
      initialValue: get(initialValues, "workRate", 0)
    }
  },
  overtimeRate: {
    name: "overtimeRate",
    placeholder: "Cтавка переработки",
    settings: {
      initialValue: get(initialValues, "overtimeRate", 0)
    }
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
    }));

    const inputs = getInputs(initialValues);

    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: -20 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Дата">
              {getFieldDecorator(
                inputs(initialValues).date.name,
                inputs(initialValues).date.settings
              )(<DatePicker {...inputs(initialValues).date} disabled />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Сотрудник">
              {getFieldDecorator(
                inputs(initialValues).userId.name,
                inputs(initialValues).userId.settings
              )(
                <Select
                  {...inputs(initialValues).userId}
                  disabled={isLoading}
                  options={userData}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Часовая ставка">
              {getFieldDecorator(
                inputs(initialValues).workRate.name,
                inputs(initialValues).workRate.settings
              )(
                <Input
                  {...inputs(initialValues).workRate}
                  disabled={isLoading}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Ставка переработки">
              {getFieldDecorator(
                inputs(initialValues).overtimeRate.name,
                inputs(initialValues).overtimeRate.settings
              )(
                <Input
                  {...inputs(initialValues).overtimeRate}
                  disabled={isLoading}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Рабочие часы">
              {getFieldDecorator(
                inputs(initialValues).workHours.name,
                inputs(initialValues).workHours.settings
              )(
                <Input
                  {...inputs(initialValues).workHours}
                  disabled={isLoading}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
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
