import React from "react";
import { Input, Form } from "antd";

const getRegExp = (float, positive) => positive
  ? float ? /^(0|[1-9]\d*)(\.\d*)?$/ : /^\d*$/
  : float ? /^-?(0|[1-9]\d*)(\.\d*)?$/ : /^-?\d*$/;

const FormInput = React.forwardRef(
  ({ onChange, positive, float, ...props}, ref) => {

    const handleChange = e => {
      e.preventDefault();
      const { value } = e.target;
      const regExp = getRegExp(float, positive);

      if (value === '') onChange(null);
      if (regExp.test(value)) onChange(value);
    }

    const value = (props.value || props.value === 0) 
      ? String(props.value) 
      : '';

    return (
      <Input 
        {...props} 
        onChange={handleChange}
        value={value} 
        ref={ref} 
      />
    );
  }
);

const InputWrapper = ({
  form,
  name,
  settings,
  itemProps,
  ...props
}) => {
  const decorateField = form 
    ? form.getFieldDecorator(name, settings) 
    : node => node;

  return (
    <Form.Item {...itemProps}>
      {decorateField(<FormInput {...props} />)}
    </Form.Item>
  );
};

export default InputWrapper;
