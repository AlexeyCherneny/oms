import React from "react";
import { Form, Button, Col, Row, Select, Input, DatePicker } from "antd";
import moment from "moment";
import { get } from "lodash";

import {
  displayDateFormat,
  programDateFormat
} from "../../services/formatters";

const inputs = initialValues => ({
  title: {
    name: "title",
    placeholder: "Название",
    settings: {
      initialValue: get(initialValues, "title", ""),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  type: {
    name: "type",
    placeholder: "Тип",
    options: [
      { label: "Доход", value: "income" },
      { label: "Расход", value: "outcome" }
    ],
    settings: {
      initialValue: get(initialValues, "type", "income"),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  amount: {
    name: "amount",
    placeholder: "Сумма",
    settings: {
      initialValue: get(initialValues, "amount", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  currency_rate: {
    name: "currency_rate",
    placeholder: "Курс",
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
  },
  receiver: {
    name: "receiver",
    placeholder: "Получатель",
    settings: {
      initialValue: get(initialValues, "title", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  payer: {
    name: "payer",
    placeholder: "Отправитель",
    settings: {
      initialValue: get(initialValues, "payer", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  }
});

const selectAfter = (
  <Select defaultValue="USD" style={{ width: 50 }}>
    <Select.Option value="USD">$</Select.Option>
    <Select.Option value="EUR">€</Select.Option>
    <Select.Option value="RUR">₽</Select.Option>
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
    const { initialValues, form, sbmtButton } = this.props;
    const { isLoading } = form;

    const values = form.getFieldsValue();

    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Название">
              {getFieldDecorator(
                inputs(initialValues).title.name,
                inputs(initialValues).title.settings
              )(
                <Input {...inputs(initialValues).title} disabled={isLoading} />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Тип">
              {getFieldDecorator(
                inputs(initialValues).type.name,
                inputs(initialValues).type.settings
              )(
                <Select {...inputs(initialValues).type} disabled={isLoading} />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Сумма">
              {getFieldDecorator(
                inputs(initialValues).amount.name,
                inputs(initialValues).amount.settings
              )(
                <Input
                  {...inputs(initialValues).amount}
                  disabled={isLoading}
                  addonAfter={selectAfter}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Курс к доллару">
              {getFieldDecorator(
                inputs(initialValues).currency_rate.name,
                inputs(initialValues).currency_rate.settings
              )(
                <Input
                  {...inputs(initialValues).currency_rate}
                  disabled={isLoading}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Дата">
              {getFieldDecorator(
                inputs(initialValues).date.name,
                inputs(initialValues).date.settings
              )(
                <DatePicker
                  {...inputs(initialValues).date}
                  disabled={isLoading}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            {values.type === "income" || values.type === undefined ? (
              <Form.Item label="От кого">
                {getFieldDecorator(
                  inputs(initialValues).payer.name,
                  inputs(initialValues).payer.settings
                )(
                  <Input
                    {...inputs(initialValues).payer}
                    disabled={isLoading}
                  />
                )}
              </Form.Item>
            ) : (
              <Form.Item label="Кому">
                {getFieldDecorator(
                  inputs(initialValues).receiver.name,
                  inputs(initialValues).receiver.settings
                )(
                  <Input
                    {...inputs(initialValues).receiver}
                    disabled={isLoading}
                  />
                )}
              </Form.Item>
            )}
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {sbmtButton ? sbmtButton : "Создать"}
        </Button>
      </Form>
    );
  }
}

export default Form.create({ name: "create_event_form" })(EventForm);
