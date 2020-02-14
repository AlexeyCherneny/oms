import React from "react";
import { Form, Button, Select, DatePicker, Col, Row, Input } from "antd";
import { Field } from "redux-form";
import "./styles/styles.scss";

import { makeReduxField } from "../../utils";
import options from "../options";

const ReduxInput = makeReduxField(Input);
const ReduxSelect = makeReduxField(Select);
const ReduxMonthPicker = makeReduxField(DatePicker.MonthPicker);

class User extends React.Component {
  isAvailable = name => {
    const { availableFields } = this.props;

    return Array.isArray(availableFields) && availableFields.includes(name);
  };

  render() {
    const { handleSubmit, isLoading, usersOptions } = this.props;

    const fieldSettings = { disabled: isLoading };
    return (
      <Form onSubmit={handleSubmit} className="wrapper-my-component">
        {this.isAvailable("value") && (
          <Field {...options.value} component={ReduxInput} {...fieldSettings} />
        )}

        {this.isAvailable("dateFrom") && (
          <Field
            {...options.dateFrom}
            component={ReduxMonthPicker}
            name="dateFrom"
            onFocus={e => e.preventDefault()}
            onBlur={e => e.preventDefault()}
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
            {...fieldSettings}
          />
        )}

        {this.isAvailable("userUuid") && (
          <Field
            {...options.userUuid}
            component={ReduxSelect}
            {...fieldSettings}
          >
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
