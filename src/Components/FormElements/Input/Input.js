import React from "react";
import { Input } from "antd";

class FormInput extends React.Component {
  render() {
    return <Input {...this.props} />;
  }
}

const InputWrapper = props =>
  props.form.getFieldDecorator(
    props.name,
    props.settings
  )(<FormInput {...props} />);

export default InputWrapper;
