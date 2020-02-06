import React from "react";
import { Input } from "antd";

class FormInput extends React.Component {
  render() {
    return <Input {...this.props} />;
  }
}

const InputWrapper = ({ name, settings, form, ...props } ) =>
  form.getFieldDecorator(
    name,
    settings
  )(<FormInput {...props} />);

export default InputWrapper;
