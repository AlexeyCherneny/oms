import React from "react";
import { Form, Button, Row, Input, Col, DatePicker } from "antd";
import Moment from "moment";

import { programDateFormat } from "../../services/formatters";

const formItemLayout = {
  style: { marginBottom: 0 }
};

const createInputs = ({ title, start_date, end_date }) => ({
  title: {
    name: "title",
    placeholder: "Название проекта",
    settings: {
      initialValue: title || "",
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
      initialValue: Moment(start_date).isValid()
        ? Moment(start_date)
        : Moment(),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    },
    style: { width: "100%" }
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
    style: { width: "100%" }
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
          end_date: Moment(values.end_date).format(programDateFormat)
        });
      }
    });
  };

  render() {
    const {
      initialValues = {},
      isLoading,
      handleSubmit,
      handleReject
    } = this.props;
    const inputs = createInputs(initialValues);
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Название проекта">
          {getFieldDecorator(
            inputs(initialValues).title.name,
            inputs(initialValues).title.settings
          )(<Input {...inputs(initialValues).title} disabled={isLoading} />)}
        </Form.Item>

        <Row type="flex" gutter={16}>
          <Col span={12}>
            <Form.Item label="Начало проекта">
              {getFieldDecorator(
                inputs(initialValues).startDate.name,
                inputs(initialValues).startDate.settings
              )(
                <DatePicker
                  {...inputs(initialValues).startDate}
                  disabled={isLoading}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Окончание проекта">
              {getFieldDecorator(
                inputs(initialValues).endDate.name,
                inputs(initialValues).endDate.settings
              )(
                <DatePicker
                  {...inputs(initialValues).endDate}
                  disabled={isLoading}
                />
              )}
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {this.props.submitTitle}
            </Button>
          )}
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "project" })(Project);
