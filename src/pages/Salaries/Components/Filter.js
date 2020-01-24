import React from "react";
import { Select, DatePicker, Form, Row, Col } from "antd";
import moment from "moment";
import { ROLES } from "../../../services/constants";

import { displayDateFormat } from "../../../services/formatters";

const Filter = props => {
  const isHR = props.user.roles.includes(ROLES.HR);

  return (
    <Form layout="inline">
      <Row>
        <Col>
          <Form.Item label="C" style={{ marginBottom: 0 }}>
            <DatePicker.MonthPicker
              format={[displayDateFormat]}
              style={{ width: 130 }}
              size="small"
              onChange={props.handleDateChange("startDate")}
              placeholder="Начальная дата"
              value={
                props.values.startDate
                  ? moment(props.values.startDate, "YYYY-MM-DD")
                  : null
              }
            />
          </Form.Item>
          <Form.Item label="По" style={{ marginBottom: 0 }}>
            <DatePicker.MonthPicker
              format={[displayDateFormat]}
              style={{ width: 130 }}
              size="small"
              onChange={props.handleDateChange("endDate")}
              placeholder="Конечная дата"
              value={
                props.values.endDate
                  ? moment(props.values.endDate, "YYYY-MM-DD")
                  : null
              }
            />
          </Form.Item>
        </Col>
      </Row>
      {isHR && (
        <Row>
          <Col>
            <Form.Item label="Пользователи" style={{ marginBottom: 0 }}>
              <Select
                mode="multiple"
                onChange={props.handleUsersChange("users")}
                placeholder="Работники"
                size="small"
                style={{ width: 226 }}
                value={props.values.users}
              >
                {props.usersOptions.map(option => (
                  <Select.Option value={option.value} key={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default Filter;
