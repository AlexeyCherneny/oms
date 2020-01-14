import React from "react";
import { Row, Col, DatePicker } from "antd";

const Filter = props => (
  <Row gutter={8} type="flex" justify="space-between" align="middle">
    <Col>
      <DatePicker.MonthPicker
        format={["MM.YYYY"]}
        onChange={props.handleDateChange("start_date")}
        placeholder="С:"
        disabledDate={date => date > props.endDate}
        value={props.startDate}
      />
    </Col>
    <Col>
      <DatePicker.MonthPicker
        format={["MM.YYYY"]}
        onChange={props.handleDateChange("end_date")}
        placeholder="По:"
        disabledDate={date => date < props.startDate}
        value={props.endDate}
      />
    </Col>
  </Row>
);

export default Filter;
