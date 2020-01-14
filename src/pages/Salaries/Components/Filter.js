import React from "react";
import { Card, Select, DatePicker, Form, Button } from "antd";
import moment from "moment";

const Filter = props => (
  <Card title="Фильтр">
    <Form.Item label="Пользователи" style={{ marginBottom: 0 }}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        onChange={props.handleSelectChange("users")}
        placeholder="Работники"
        value={props.values.users}
      >
        {props.usersOptions.map(option => (
          <Select.Option value={option.value} key={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item label="Дата начала" style={{ marginBottom: 0 }}>
      <DatePicker.MonthPicker
        format={["YYYY-MM-DD"]}
        style={{ width: "100%" }}
        onChange={props.handleDateChange("start_date")}
        placeholder="Начальная дата"
        value={
          props.values.start_date
            ? moment(props.values.start_date, "YYYY-MM-DD")
            : null
        }
      />
    </Form.Item>
    <Form.Item label="Дата окончания" style={{ marginBottom: 10 }}>
      <DatePicker.MonthPicker
        format={["YYYY-MM-DD"]}
        style={{ width: "100%" }}
        onChange={props.handleDateChange("end_date")}
        placeholder="Конечная дата"
        value={
          props.values.end_date
            ? moment(props.values.end_date, "YYYY-MM-DD")
            : null
        }
      />
    </Form.Item>
    <Button onClick={props.handleReset}>Сбросить</Button>
  </Card>
);

export default Filter;
