import React from "react";
import { DatePicker } from "antd";

class FormDatepicker extends React.Component {
  render() {
    return <DatePicker {...this.props} />;
  }
}

const DatepickerWrapper = props =>
  props.form.getFieldDecorator(
    props.name,
    props.settings
  )(<FormDatepicker {...props} />);

export default DatepickerWrapper;
