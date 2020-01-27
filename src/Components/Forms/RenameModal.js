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
    placeholder: "Название документа",
    settings: {
      initialValue: get(initialValues, "title", ''),
      rules: [{ required: true, message: "Обязательное поле" }]
    }
  }
});

const RenameModal = ({
  form,
  initialValues,
  isLoading,
  submitTitle,
  rejectTitle,
  handleSubmit,
  handleReject,
}) => {
  
  const onSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) handleSubmit({ ...initialValues, ...values });
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item {...formItemLayout}>
        <FormInput
          form={form}
          {...inputs(initialValues).title}
          disabled={isLoading}
        />
      </Form.Item>
      <div
        style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
      >
        {handleReject && (
          <Button
            disabled={isLoading}
            style={{ marginRight: 10 }}
            onClick={handleReject}
          >
            {rejectTitle}
          </Button>
        )}
        {handleSubmit && (
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {submitTitle}
          </Button>
        )}
      </div>
    </Form>
  );
}

export default Form.create({ name: "rename_modal" })(RenameModal);
