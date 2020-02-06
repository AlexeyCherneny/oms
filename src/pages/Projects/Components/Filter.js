import React from "react";
import { DatePicker, Form } from "antd";
import moment from "moment";

import { displayDateFormat } from "../../../services/formatters";

const Filter = props => {
  return (
    <Form layout="inline">
      <Form.Item style={{ marginBottom: 0 }}>
        <DatePicker.MonthPicker
          format={[displayDateFormat]}
          style={{ width: 150 }}
          size="small"
          onChange={props.handleDateChange}
          placeholder="Дата"
          value={
            props.searchObj.date ? moment(props.searchObj.date) : null
          }
        />
      </Form.Item>
    </Form>
  );
};

export default Filter;
