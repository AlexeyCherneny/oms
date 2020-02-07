import React from "react";
import { Form, Button, Col, Row, Select } from "antd";

import * as styles from "./styles/AddUsersAccess.module.scss";
import { getFullName } from "../../services/formatters";

const renderUsersList = users =>
  users.length > 0 && users.map(user => (
    <Select.Option key={user.uuid}>
      {getFullName(user)}
    </Select.Option>
  ));


export const AccessSelect = React.forwardRef(({ 
  permissions, 
  description, 
  ...props 
}, ref) => (
  <Select
    className={styles.select}
    placeholder="Выберите роль"
    ref={ref}
    { ...props }
  >
    {permissions.map(item => (
      <Select.Option key={item}>
        {description[item].name}
      </Select.Option>
    ))}
  </Select>
));


const AccessesForm = ({
  form,
  submitForm,
  isLoading,
  usersData,
  permissions = [],
  description = {},
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        submitForm(values, () => form.resetFields());
      }
    });
  };

  const disabledSelect = isLoading || !usersData?.length;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {form.getFieldDecorator("users", {
          rules: [
            { required: true, message: "Пожалуйста выберите пользователей" }
          ],
        })(
          <Select
            className={styles.select}
            mode="multiple"
            placeholder="Выберите сотрудников"
            disabled={disabledSelect}
          >
            {renderUsersList(usersData)}
          </Select>
        )}
      </Form.Item>
      <Row className={styles.row} gutter={16} align="middle">
        <Col span={16}>
          <Form.Item>
            {form.getFieldDecorator("access", {
              rules: [
                { required: true, message: "Пожалуйста выберите роль" }
              ],
            })(
              <AccessSelect 
                permissions={permissions}
                description={description}
                disabled={disabledSelect}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={8} className={styles.buttonWrap}>
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            disabled={disabledSelect}
          >
            Добавить
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create({ name: "add_users_access" })(AccessesForm);
