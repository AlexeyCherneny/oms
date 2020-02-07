import React from "react";
import { Form, Button, Row, Col } from "antd";
import Moment from "moment";

import { Input, DatePicker } from "../FormElements";
import { programDateFormat } from "../../services/formatters";

const createInputs = ({ title, start_date, end_date }) => ({
  title: {
    name: "title",
    placeholder: "Название проекта",
    settings: {
      initialValue: title || '',
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    }
  },
  startDate: {
    name: "start_date",
    placeholder: "Начало проекта",
    settings: {
      initialValue: Moment(start_date).isValid() ? Moment(start_date) : Moment(),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    },
    style: { width: '100%' }
  },
  endDate: {
    name: "end_date",
    placeholder: "Окончание проекта",
    settings: {
      initialValue: Moment(end_date).isValid() ? Moment(end_date) : Moment(),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    },
    style: { width: '100%' }
  }
});

class Project extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, handleSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit({ 
          ...values,
          start_date: Moment(values.start_date).format(programDateFormat),
          end_date: Moment(values.end_date).format(programDateFormat),
        });
      }
    });
  };

  render() {
    const {
      initialValues = {},
      form,
      isLoading,
      handleSubmit,
      handleReject
    } = this.props;

    const inputs = createInputs(initialValues);

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: -24 }}>
        <Form.Item label="Название проекта">
          <Input
            form={form}
            {...inputs.title}
            disabled={isLoading}
          />
        </Form.Item>

        <Row type="flex" gutter={16}>
          <Col span={12}>
            <Form.Item label="Начало проекта">
              <DatePicker
                form={form}
                {...inputs.startDate}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Окончание проекта">
              <DatePicker
                form={form}
                {...inputs.endDate}
                disabled={isLoading}
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {handleReject && (
            <Button
              disabled={isLoading}
              style={{ marginRight: 10 }}
              onClick={handleReject}
            >
              {this.props.rejectTitle}
            </Button>
          )}
          {handleSubmit && (
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
            >
              {this.props.submitTitle}
            </Button>
          )}
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "project" })(Project);
