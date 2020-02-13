import React from "react";
import { Form } from "antd";

const FormItem = Form.Item;

export const makeReduxField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  inputProps,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;

  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...inputProps} {...rest} children={children} />
    </FormItem>
  );
};
