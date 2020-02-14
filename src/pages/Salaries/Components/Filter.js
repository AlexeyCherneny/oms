import React from "react";
import { Select, DatePicker, Form } from "antd";
import moment from "moment";
import { ROLES } from "../../../services/constants";

import { displayDateFormat } from "../../../services/formatters";

const Filter = props => {
  const isHR = props.user.roles.includes(ROLES.HR);

  return (
    <Form layout="inline">
      <Form.Item label="C" style={{ marginBottom: 0 }}>
        <DatePicker.MonthPicker
          format={[displayDateFormat]}
          style={{ width: 130 }}
          size="small"
          onChange={props.handleDateChange("dateFrom")}
          placeholder="Начальная дата"
          value={
            props.values.dateFrom
              ? moment(props.values.dateFrom, "YYYY-MM-DD")
              : null
          }
        />
      </Form.Item>
      <Form.Item label="По" style={{ marginBottom: 0 }}>
        <DatePicker.MonthPicker
          format={[displayDateFormat]}
          style={{ width: 130 }}
          size="small"
          onChange={props.handleDateChange("dateTo")}
          placeholder="Конечная дата"
          value={
            props.values.dateTo
              ? moment(props.values.dateTo, "YYYY-MM-DD")
              : null
          }
        />
      </Form.Item>
      {isHR && (
        <Form.Item label="Пользователи" style={{ marginBottom: 0 }}>
          <Select
            mode="multiple"
            onChange={props.handleUsersChange("uuid")}
            placeholder="Работники"
            size="small"
            style={{ width: 226 }}
            value={props.values.uuid}
          >
            {props.usersOptions.map(option => (
              <Select.Option value={option.value} key={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </Form>
  );
};

export default Filter;
