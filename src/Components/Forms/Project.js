import React from "react";
import { Form, Button, Row, Col } from "antd";
import Moment from "moment";

import { Input, DatePicker } from "../FormElements";
import { programDateFormat } from "../../services/formatters";

const formItemLayout = {
  style: { marginBottom: 0 }
};

const createInputs = ({ title, startDate, endDate, isLoading }) => ({
  title: {
    name: "title",
    placeholder: "Название проекта",
    settings: {
      initialValue: title || '',
      rules: [
        { required: true, message: "Обязательное поле" }
      ]
    },
    itemProps: {
      ...formItemLayout,
      label: "Начало проекта"
    },
    disabled: isLoading,
  },
  startDate: {
    name: "startDate",
    placeholder: "Начало проекта",
    settings: {
      initialValue: Moment(startDate).isValid() ? Moment(startDate) : Moment(),
      rules: [
        { required: true, message: "Обязательное поле" }
      ]
    },
    itemProps: { 
      label: "Начало проекта" 
    },
    disabled: isLoading,
    style: { width: '100%' }
  },
  endDate: {
    name: "endDate",
    placeholder: "Окончание проекта",
    settings: {
      initialValue: Moment(endDate).isValid() ? Moment(endDate) : Moment(),
      rules: [
        { required: true, message: "Обязательное поле" }
      ]
    },
    itemProps: {
      label: "Окончание проекта"
    },
    disabled: isLoading,
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
          startDate: Moment(values.startDate).format(programDateFormat),
          endDate: Moment(values.endDate).format(programDateFormat),
        });
      }
    });
  };

  render() {
    const {
      initialValues = {},
      isLoading,
      form,
      handleSubmit,
      handleReject
    } = this.props;

    const inputs = createInputs(initialValues);

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: -24 }}>
        <Input
          form={form}
          {...inputs.title}
        />

        <Row type="flex" gutter={16}>
          <Col span={12}>
            <DatePicker
              form={form}
              {...inputs.startDate}
            />
          </Col>
          <Col span={12}>
            <DatePicker
              form={form}
              {...inputs.endDate}
            />
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
