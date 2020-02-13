import React from "react";
import { Form, Button, Select, DatePicker, Col, Row } from "antd";
import { Field, reduxForm } from "redux-form";
import "./styles.scss";

import { Input } from "../../FormElements";
import MaskedInput from "../../FormElements/MaskedInput/MaskedInput";
import Avatar from "../../FormElements/Avatar/Avatar";
import { ROLES } from "../../../services/constants";
import { makeReduxField } from "../utils";
import options from "./options";

const roles = [
  { label: "HR", value: ROLES.HR },
  { label: "Пользователь", value: ROLES.EMPLOYEE }
];

const ReduxAvatar = makeReduxField(Avatar);
const ReduxInput = makeReduxField(Input);
const ReduxMaskedInput = makeReduxField(MaskedInput);
const ReduxSelect = makeReduxField(Select);
const ReduxDatePicker = makeReduxField(DatePicker);

class User extends React.Component {
  isAvailable = name => {
    const { availableFields } = this.props;

    return Array.isArray(availableFields) && availableFields.includes(name);
  };

  render() {
    const { handleSubmit, isLoading } = this.props;

    const fieldSettings = { disabled: isLoading };
    return (
      <Form onSubmit={handleSubmit} className="wrapper-my-component">
        {this.isAvailable("photo") && (
          <Row type="flex" justify="center">
            <Col>
              <Field
                {...options.photo}
                component={ReduxAvatar}
                {...fieldSettings}
              />
            </Col>
          </Row>
        )}

        {this.isAvailable("email") && (
          <Field {...options.email} component={ReduxInput} {...fieldSettings} />
        )}

        {this.isAvailable("phone") && (
          <Field
            {...options.phone}
            component={ReduxMaskedInput}
            {...fieldSettings}
          />
        )}

        {this.isAvailable("lastName") && (
          <Field
            {...options.lastName}
            component={ReduxInput}
            {...fieldSettings}
          />
        )}

        {this.isAvailable("firstName") && (
          <Field
            {...options.firstName}
            component={ReduxInput}
            {...fieldSettings}
          />
        )}

        {this.isAvailable("middleName") && (
          <Field
            {...options.middleName}
            component={ReduxInput}
            {...fieldSettings}
          />
        )}

        {this.isAvailable("roles") && (
          <Field
            {...options.roles}
            component={ReduxSelect}
            options={roles}
            {...fieldSettings}
          >
            {roles.map(role => (
              <Select.Option key={role.value} value={role.value}>
                {role.label}
              </Select.Option>
            ))}
          </Field>
        )}

        {this.isAvailable("birthday") && (
          <Field
            {...options.birthday}
            component={ReduxDatePicker}
            name="birthday"
            onFocus={e => e.preventDefault()}
            onBlur={e => e.preventDefault()}
            {...fieldSettings}
          />
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

export default reduxForm({
  form: "user",
  enableReinitialize: true
})(User);
