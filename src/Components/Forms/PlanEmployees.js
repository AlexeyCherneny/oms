import React from 'react';
import {
  Form,
  Button,
  DatePicker,
  Icon,
  Row,
  Col,
} from "antd";
import Moment from "moment";
import NumericInput from './Components/NumericInput';
import { isNumber } from '../../services/validators';

const rowProps = {
  gutter: 16,
  type: "flex",
};

const colProps = {
  span: 12,
  style: {
    width: 'calc(50% - 12px)',
  }
}

class PlanEmployees extends React.PureComponent { 
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    })
  }

  render() {
    const {
      initialValues,
      isCreate,
      isLoading,
      form: { getFieldDecorator },
    } = this.props;

    const step = Number(initialValues.step) || 0;
    const number = Number(initialValues.number) || 0;

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Row {...rowProps} >
          <Col {...colProps} >
            <Form.Item label="Начало периода">
              {getFieldDecorator("date_from", {
                initialValue: Moment(initialValues.date_from),
                rules: [
                  { required: true, message: 'Выберите начало периода' },
                ],
              })(
                <DatePicker.MonthPicker
                  suffixIcon={<Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />}
                  disabled={isLoading}
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col {...colProps} >
            <Form.Item label="Окончание периода">
              {getFieldDecorator("date_to", {
                initialValue: Moment(initialValues.date_to),
                rules: [
                  { required: true, message: 'Выберите окончание периода' },
                ],
              })(
                <DatePicker.MonthPicker
                  suffixIcon={<Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />}
                  disabled={isLoading}
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col {...colProps} >
            <Form.Item label="Текущее количество сотрудников">
              {getFieldDecorator("number", {
                initialValue: number - step,
                rules: [
                  { required: true, message: 'Введите число' },
                  { validator: isNumber },
                ]
              })(
                <NumericInput
                  suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  disabled={isLoading}
                  style={{ width: '100%' }}
                  isPositive
                />
              )}
            </Form.Item>
            </Col>
            <Col {...colProps} >
            <Form.Item label="Ожидаемый рост штата (в месяц)">
              {getFieldDecorator("step", {
                initialValue: step,
                rules: [
                  { required: true, message: 'Введите число' },
                  { validator: isNumber },
                ]
              })(
                <NumericInput
                  suffix={<Icon type="usergroup-add" style={{ color: "rgba(0,0,0,.25)" }} />}
                  disabled={isLoading}
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isCreate ? 'Создать' : 'Сохранить'}
        </Button>
      </Form>
    );
  }
}

export default Form.create({ name: "plan_employees_form" })(PlanEmployees);
