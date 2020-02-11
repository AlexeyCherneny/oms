import React from "react";
import { DatePicker, Form } from "antd";
import Moment from "moment";

import { displayDateFormat } from "../../../services/formatters";

const Filter = ({ handleDateChange, searchObj }) => {
  return (
    <Form layout="inline">
      <Form.Item style={{ marginBottom: 0 }}>
        <DatePicker.MonthPicker
          format={[displayDateFormat]}
          style={{ width: 150 }}
          size="small"
          onChange={handleDateChange}
          placeholder="Дата"
          value={searchObj?.date ? Moment(searchObj.date) : null}
        />
      </Form.Item>
    </Form>
  );
};

export default Filter;
