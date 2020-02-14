import React from "react";
import { DatePicker, Form } from "antd";

const FormDatepicker = React.forwardRef((props, ref) => {
  return (
    <DatePicker {...props} ref={ref} />
  );
});

const DatepickerWrapper = ({
  form,
  name,
  settings,
  itemProps,
  ...props
}) => {
  const decorateField = form ? form.getFieldDecorator(name, settings) : node => node;

  return (
    <Form.Item {...itemProps}>
      {decorateField(<FormDatepicker {...props} />)}
    </Form.Item>
  );
};

export default DatepickerWrapper;
