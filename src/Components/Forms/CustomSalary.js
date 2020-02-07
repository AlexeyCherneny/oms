import React from "react";
import { Form, Button } from "antd";
import moment from "moment";
import { get } from "lodash";
import { connect } from "react-redux";

import {
  displayDateFormat,
  programDateFormat,
  getShortName
} from "../../services/formatters";
import FormInput from "../FormElements/Input/Input";
import MonthPicker from "../FormElements/MonthPicker/MonthPicker";
import FormSelect from "../FormElements/Select/Select";

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
  dateFrom: {
    name: "dateFrom",
    placeholder: "Дата",
    format: [displayDateFormat],
    settings: {
      initialValue: get(initialValues, "dateFrom", "")
        ? moment(get(initialValues, "dateFrom", ""), programDateFormat)
        : null,
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  },
  dateTo: {
    name: "dateTo",
    placeholder: "Дата",
    format: [displayDateFormat],
    settings: {
      initialValue: get(initialValues, "dateTo", "")
        ? moment(get(initialValues, "dateTo", ""), programDateFormat)
        : null
    }
  },
  user: {
    name: "user",
    placeholder: "Пользователь",
    settings: {
      initialValue: get(initialValues, "user", null),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  }
});

// const selectAfter = (
//   <Select defaultValue="USD" style={{ width: 50 }}>
//     <Select.Option value="USD" key="USD">
//       $
//     </Select.Option>
//     <Select.Option value="EUR" key="EUR">
//       €
//     </Select.Option>
//     <Select.Option value="RUR" key="RUR">
//       ₽
//     </Select.Option>
//   </Select>
// );

class EventForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          dateFrom: values.dateFrom.format(programDateFormat),
          dateTo: values.dateTo.format(programDateFormat)
        };

        this.props.handleSubmit(params);
      }
    });
  };

  render() {
    const { initialValues, form, isLoading, disabled, users } = this.props;

    const dis = isLoading || disabled;
    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Form.Item label="Сумма" style={{ marginBottom: 0 }}>
          <FormInput
            form={form}
            {...inputs(initialValues).value}
            disabled={dis}
            // addonAfter={selectAfter}
          />
        </Form.Item>

        <Form.Item label="С" style={{ marginBottom: 0 }}>
          <MonthPicker
            form={form}
            {...inputs(initialValues).dateFrom}
            disabled={dis}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="По" style={{ marginBottom: 0 }}>
          <MonthPicker
            form={form}
            {...inputs(initialValues).dateTo}
            disabled={dis}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Пользователь" style={{ marginBottom: 0 }}>
          <FormSelect
            form={form}
            {...inputs(initialValues).user}
            disabled
            options={users.map(user => ({
              label: getShortName(user),
              value: String(user.uuid)
            }))}
          />
        </Form.Item>

        <div
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            disabled={dis}
            loading={isLoading}
          >
            Сохранить
          </Button>
        </div>
      </Form>
    );
  }
}

export default connect(state => ({ users: state.users.data || [] }))(
  Form.create({ name: "create_event_form" })(EventForm)
);
