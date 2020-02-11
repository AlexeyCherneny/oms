import React from "react";
import { Form, Select } from "antd";

const FormSelect = React.forwardRef(
  ({ options, ...props }, ref) => {

    return (
      <Select {...props} ref={ref}>
        {options && options.map(option => (
          <Select.Option value={option.value} key={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
); 

const SelectWrapper = ({ 
  form, 
  name, 
  settings, 
  itemProps, 
  ...props 
}) => {
  const decorateField = form ? form.getFieldDecorator(name, settings) : node => node;

  return (
    <Form.Item {...itemProps}>
      {decorateField(<FormSelect {...props} />)}
    </Form.Item>
  );
}

export default SelectWrapper;
