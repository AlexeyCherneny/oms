import React from "react";
import { Form, Button, Col, Row, Select } from "antd";
import moment from "moment";
import { get } from "lodash";

import {
  displayDateFormat,
  programDateFormat
} from "../../services/formatters";
import FormInput from "../FormElements/Input/Input";
import FormDatepicker from "../FormElements/Datepicker/Datepicker";

const inputs = initialValues => ({
  value: {
    name: "value",
    placeholder: "Сумма",
    settings: {
      initialValue: get(initialValues, "value", ""),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  currency: {
    name: "currency",
    placeholder: "Валюта",
    settings: {
      initialValue: get(initialValues, "currency_rate", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  date: {
    name: "date",
    placeholder: "Дата",
    format: [displayDateFormat],
    settings: {
      initialValue: get(initialValues, "date", "")
        ? moment(get(initialValues, "date", ""), programDateFormat)
        : null,
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  }
});

const selectAfter = (
  <Select defaultValue="USD" style={{ width: 50 }}>
    <Select.Option value="USD" key="USD">
      $
    </Select.Option>
    <Select.Option value="EUR" key="EUR">
      €
    </Select.Option>
    <Select.Option value="RUR" key="RUR">
      ₽
    </Select.Option>
  </Select>
);

class EventForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  render() {
    const { initialValues, form, isLoading, disabled } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Сумма">
              <FormInput
                form={form}
                {...inputs(initialValues).value}
                disabled={disabled}
                addonAfter={selectAfter}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Дата">
              <FormDatepicker
                form={form}
                {...inputs(initialValues).date}
                disabled={disabled}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          disabled={disabled}
          loading={isLoading}
        >
          Сохранить
        </Button>
      </Form>
    );
  }
}

export default Form.create({ name: "create_event_form" })(EventForm);
