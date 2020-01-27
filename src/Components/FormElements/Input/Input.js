import React from "react";
import { Input, Form } from "antd";

const FormInput = React.forwardRef((props, ref) => {
  return (
    <Input {...props} ref={ref} />
  );
});

const InputWrapper = ({
  form,
  name,
  settings,
  itemProps,
  ...props
}) => {
  const decorateField = form ? form.getFieldDecorator(name, settings) : node => node;

  return (
    <Form.Item {...itemProps}>
      {decorateField(<FormInput {...props} />)}
    </Form.Item>
  );
};

export default InputWrapper;
