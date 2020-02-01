import React from "react";
import { DatePicker, Form } from "antd";
import moment from "moment";

import { displayDateFormat } from "../../../services/formatters";

const Filter = props => {
  return (
    <Form layout="inline">
      <Form.Item label="C" style={{ marginBottom: 0 }}>
        <DatePicker.MonthPicker
          format={[displayDateFormat]}
          style={{ width: 150 }}
          size="small"
          onChange={props.handleDateChange("date")}
          placeholder="Дата"
          value={
            props.values.date ? moment(props.values.date, "YYYY-MM-DD") : null
          }
        />
      </Form.Item>
    </Form>
  );
};

export default Filter;
