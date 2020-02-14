import React from "react";
import { DatePicker } from "antd";

class FormMonthPicker extends React.Component {
  render() {
    return <DatePicker.MonthPicker {...this.props} />;
  }
}

const MonthPickerWrapper = props =>
  props.form.getFieldDecorator(
    props.name,
    props.settings
  )(<FormMonthPicker {...props} />);

export default MonthPickerWrapper;
