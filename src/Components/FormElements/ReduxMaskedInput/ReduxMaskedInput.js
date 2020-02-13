import React from "react";
import { Form } from "antd";

import MaskedInput from "../MaskedInput/MaskedInput";

class CustomMaskedInput extends React.Component {
  onChange = event => this.props.input.onChange(event.target.value);

  render() {
    const { label, meta, hasFeedback, input } = this.props;

    const hasError = meta.touched && meta.invalid;

    return (
      <Form.Item
        label={label}
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
      >
        <MaskedInput {...this.props} {...input} />
      </Form.Item>
    );
  }
}

export default CustomMaskedInput;
