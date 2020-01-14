import React from "react";
import { Drawer, Form } from "antd";

import CreateEventForm from "../../../Components/Forms/CreateEvent";

const DrawerForm = ({
  onClose,
  handleSubmit,
  handleDelete,
  isLoading,
  isCreate,
  isOpen,
  event
}) => (
    <Drawer
      title={isCreate ? "Создать мероприятие" : "Редактирование мероприятия"}
      width={640}
      onClose={onClose}
      visible={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
    >
      <CreateEventForm
        isCreate={isCreate}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        initialValues={event}
      />
    </Drawer>
  );

export default Form.create()(DrawerForm);
