import React from "react";
import { Form, Button } from "antd";
import { get } from "lodash";

import FormInput from "../FormElements/Input/Input";

const formItemLayout = {
  style: { marginBottom: 0 }
};

const inputs = initialValues => ({
  title: {
    name: "title",
    placeholder: "OMS",
    settings: {
      initialValue: get(initialValues, "title", ""),
      rules: [
        {
          required: true,
          message: "Обязательное поле"
        }
      ]
    }
  }
});

class Project extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, handleSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit(values);
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

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Название">
          <FormInput
            form={form}
            {...inputs(initialValues).title}
            disabled={isLoading}
          />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {handleReject && (
            <Button
              loading={isLoading}
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
