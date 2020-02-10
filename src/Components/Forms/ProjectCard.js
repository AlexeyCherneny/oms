import React from "react";
import { Form, Button } from "antd";
import { get } from "lodash";

import { Input } from "../FormElements";
import "./styles/ProjectsCard.scss";

const formItemLayout = {
  style: { marginBottom: 0, lineHeight: 30 },
  labelCol: { span: 14 },
  wrapperCol: { span: 8, offset: 2 },
};

const getInputs = (initialValues = {}) => ({
  workHours: {
    name: 'workHours',
    label: "Отработано, ч",
    placeholder: "",
    size: 'small',
    settings: {
      initialValue: get(initialValues, "workHours", 0),
    }
  },
  overtimeHours: {
    name: 'overtimeHours',
    label: "Переработка, ч",
    placeholder: "",
    size: 'small',
    settings: {
      initialValue: get(initialValues, "overtimeHours", 0),
    }
  }
});

class ProjectCard extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, handleSubmit, initialValues } = this.props;
    
    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit({ ...initialValues, ...values });
      }
    });
  };

  render() {
    const {
      initialValues,
      form,
      isLoading,
      isUpdating,
    } = this.props;

    const inputs = getInputs(initialValues);

    return (
      <Form onSubmit={this.handleSubmit} className="project-card-form">
        <Form.Item {...formItemLayout} label={inputs.workHours.label}>
          <Input
            form={form}
            {...inputs.workHours}
            disabled={isLoading || isUpdating}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label={inputs.overtimeHours.label}>
          <Input
            form={form}
            {...inputs.overtimeHours}
            disabled={isLoading || isUpdating}
          />
        </Form.Item>

        <div
          style={{ marginTop: 6, textAlign: "right" }}
        >
          <Button
            type="primary"
            size="small"
            htmlType="submit"
            loading={isUpdating}
            disabled={isLoading}
          >
            Сохранить
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: "project_card" })(ProjectCard);
