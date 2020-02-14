import React from "react";
import { Form, Button } from "antd";
import { get } from "lodash";

import { InputNumber } from "../FormElements";
import "./styles/ProjectsCard.scss";

const formItemLayout = {
  style: { marginBottom: 0, lineHeight: 30 },
  labelCol: { span: 14 },
  wrapperCol: { span: 8, offset: 2 },
};

const getInputs = (initialValues = {}) => ({
  workHours: {
    name: 'workHours',
    placeholder: "",
    size: 'small',
    settings: {
      initialValue: get(initialValues, "workHours", 0),
    },
    itemProps: {
      ...formItemLayout,
      label: "Отработано, ч",
    },
    disabled: initialValues.isLoading || initialValues.isUpdating,
  },
  overtimeHours: {
    name: 'overtimeHours',
    placeholder: "",
    size: 'small',
    settings: {
      initialValue: get(initialValues, "overtimeHours", 0),
    },
    itemProps: {
      ...formItemLayout,
      label: "Переработка, ч",
    },
    disabled: initialValues.isLoading || initialValues.isUpdating,
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
        <InputNumber
          form={form}
          {...inputs.workHours}
          positive
          float
        />

        <InputNumber
          form={form}
          {...inputs.overtimeHours}
          positive
          float
        />

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
