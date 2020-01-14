import React from "react";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Select,
  DatePicker,
  TimePicker,
  Checkbox
} from "antd";
import moment from "moment";

class EventForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator, isLoading } = this.props.form;
    const { initialValues, isCreate, handleDelete } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Название">
              {getFieldDecorator("title", {
                rules: [
                  { required: true, message: "Пожалуйста, введите название" }
                ],
                initialValue: initialValues.title
              })(
                <Input
                  placeholder="Пожалуйста, введите название"
                  disabled={isLoading}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Тип">
              {getFieldDecorator("event_type", {
                rules: [{ required: true, message: "Пожалуйста, выберите тип" }],
                initialValue: initialValues.event_type
              })(
                <Select
                  placeholder="Пожалуйста, выберите тип"
                  disabled={isLoading}
                >
                  <Select.Option value="time_off">Отгул</Select.Option>
                  <Select.Option value="holiday">Отпуск</Select.Option>
                  <Select.Option value="sick_leave">Больничный</Select.Option>
                  <Select.Option value="part_time_day">
                    Неполный рабочий день
                  </Select.Option>
                  <Select.Option value="work_by_time_off">
                    Отработка
                  </Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12} justify="middle">
            <Form.Item
              label="Дата начала"
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            >
              {getFieldDecorator("start_date", {
                rules: [
                  {
                    required: true,
                    message: "Пожалуйста, выберите дату начала"
                  }
                ],
                initialValue: moment(initialValues.start_date)
              })(<DatePicker disabled={isLoading} />)}
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "24px",
                textAlign: "center"
              }}
            ></span>
            <Form.Item
              label="Время начала"
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            >
              {getFieldDecorator("start_time", {
                initialValue: moment(initialValues.start_time)
              })(
                <TimePicker disabled={isLoading} placeholder="Время начала" />
              )}
            </Form.Item>
          </Col>

          <Col span={12} justify="middle">
            <Form.Item
              label="Дата окончания"
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            >
              {getFieldDecorator("end_date", {
                rules: [
                  {
                    required: true,
                    message: "Пожалуйста, выберите дату окончания"
                  }
                ],
                initialValue: moment(initialValues.end_date)
              })(<DatePicker disabled={isLoading} />)}
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "24px",
                textAlign: "center"
              }}
            ></span>
            <Form.Item
              label="Время окончания"
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            >
              {getFieldDecorator("end_time", {
                initialValue: moment(initialValues.end_time)
              })(
                <TimePicker disabled={isLoading} placeholder="Время начала" />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {getFieldDecorator("all_day", {
            valuePropName: "checked",
            initialValue: initialValues.all_day
          })(<Checkbox>Весь день</Checkbox>)}
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Описание">
              {getFieldDecorator("description", {
                initialValue: initialValues.description
              })(
                <Input.TextArea
                  rows={4}
                  placeholder="Пожалуйста, введите описание"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isCreate ? 'Создать' : 'Сохранить'}
        </Button>
        {!isCreate && (
          <Button type="danger" disabled={isLoading} onClick={handleDelete} style={{marginLeft: 10}}>
            Удалить
          </Button>
        )}
      </Form>
    );
  }
}

export default Form.create({ name: "create_event_form" })(EventForm);
