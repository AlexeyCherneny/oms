import React from "react";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "antd";
import { get } from "lodash";
import moment from "moment";

import FormDatepicker from "../FormElements/Datepicker/Datepicker";
import FormSelect from "../FormElements/Select/Select";
import FormInput from "../FormElements/Input/Input";
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
        ? moment(get(initialValues, "date", ""))
        : null,
      rules: [{ required: true, message: "Обязательное поле" }]
    },
    style: { width: "100%" }
  },
  userId: {
    name: "user_id",
    placeholder: "Сотрудник",
    settings: {
      initialValue: get(initialValues, "user_id", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  workHours: {
    name: "work_hours",
    placeholder: "Рабочие часы",
    settings: {
      initialValue: get(initialValues, "work_hours", 0),
    }
  },
  overtimeHours: {
    name: "overtime_hours",
    placeholder: "Переработанные часы",
    settings: {
      initialValue: get(initialValues, "overtime_hours", 0),
    }
  },
  workRate: {
    name: "work_rate",
    placeholder: "Часовая ставка",
    settings: {
      initialValue: get(initialValues, "work_rate", 0),
    }
  },
  overtimeRate: {
    name: "work_overtime",
    placeholder: "Cтавка переработки",
    settings: {
      initialValue: get(initialValues, "overtime_rate", 0),
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
          date: moment(values.date).format(DATE_FORMATS.dashReverse)
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
      label: `${user.first_name[0]}. ${user.last_name}`,
      value: String(user.uuid)
    }))

    const inputs = getInputs(initialValues);

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: -20 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Дата">
              <FormDatepicker
                form={form}
                {...inputs.date}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item  {...formItemLayout} label="Сотрудник">
              <FormSelect
                form={form}
                options={userData}
                {...inputs.userId}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Часовая ставка">
              <FormInput
                form={form}
                {...inputs.workRate}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Ставка переработки">
              <FormInput
                form={form}
                {...inputs.overtimeRate}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Рабочие часы">
              <FormInput
                form={form}
                {...inputs.workHours}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="Переработанные часы">
              <FormInput
                form={form}
                {...inputs.overtimeHours}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
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
