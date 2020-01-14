import React from "react";
import { Select } from "antd";
import { get } from "lodash";

class FormSelect extends React.Component {
  render() {
    const options = get(this.props, "options", []);

    return (
      <Select {...this.props}>
        {options.map(option => (
          <Select.Option value={option.value} key={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

const SelectWrapper = props =>
  props.form.getFieldDecorator(
    props.name,
    props.settings
  )(<FormSelect {...props} />);

export default SelectWrapper;
