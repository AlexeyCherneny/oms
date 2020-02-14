import React from "react";
import { Form, Button, Select, DatePicker, Col, Row } from "antd";
import { Field } from "redux-form";
import moment from "moment";
import "./styles/styles.scss";

import InputNumber from "../../../FormElements/InputNumber/InputNumber";
import { makeReduxField } from "../../utils";
import options from "../options";

const ReduxNumberInput = makeReduxField(InputNumber);
const ReduxSelect = makeReduxField(Select);
const ReduxMonthPicker = makeReduxField(DatePicker.MonthPicker);

class User extends React.Component {
  isAvailable = name => {
    const { availableFields } = this.props;

    return Array.isArray(availableFields) && availableFields.includes(name);
  };

  render() {
    const {
      handleSubmit,
      isLoading,
      usersOptions,
      dateFrom,
      dateTo
    } = this.props;

    const fieldSettings = { disabled: isLoading };
    return (
      <Form onSubmit={handleSubmit} className="wrapper-my-component">
        {this.isAvailable("value") && (
          <Field
            {...options.value}
            component={ReduxNumberInput}
            {...fieldSettings}
          />
        )}

        {this.isAvailable("dateFrom") && (
          <Field
            {...options.dateFrom}
            component={ReduxMonthPicker}
            name="dateFrom"
            onFocus={e => e.preventDefault()}
            onBlur={e => e.preventDefault()}
            disabledDate={d => !d || d.isAfter(moment(dateTo))}
            {...fieldSettings}
          />
        )}

        {this.isAvailable("dateTo") && (
          <Field
            {...options.dateTo}
            component={ReduxMonthPicker}
            name="dateTo"
            onFocus={e => e.preventDefault()}
            onBlur={e => e.preventDefault()}
            disabledDate={d => !d || d.isBefore(moment(dateFrom))}
            {...fieldSettings}
          />
        )}

        {this.isAvailable("userUuid") && (
          <Field {...options.userUuid} component={ReduxSelect} disabled={true}>
            {usersOptions.map(role => (
              <Select.Option key={role.value} value={role.value}>
                {role.label}
              </Select.Option>
            ))}
          </Field>
        )}

        <Row type="flex" justify="end" style={{ marginTop: 15 }}>
          <Col>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {this.props.submitTitle}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default User;
