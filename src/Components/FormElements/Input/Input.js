import React from "react";
import { Input } from "antd";

const InputWrapper = props =>
  props.form &&
  props.form.getFieldDecorator(
    props.name,
    props.settings
  )(<Input {...props} />);

export default InputWrapper;
