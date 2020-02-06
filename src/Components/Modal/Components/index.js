import React from "react";
import { Modal } from "antd";

import ProjectForm from "../../Forms/Project";
import ProjectWorkForm from "../../Forms/ProjectWork";
import CustomSalary from "../../Forms/CustomSalary";

const ModalContent = props => {
  const { isLoading } = props;

  switch (props.type) {
    case "project": {
      return (
        <ProjectForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
          isLoading={isLoading}
        />
      );
    }
    case "projectWork": {
      return (
        <ProjectWorkForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
          isLoading={isLoading}
        />
      );
    }
    case "customSalary": {
      return (
        <CustomSalary
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
          isLoading={isLoading}
        />
      );
    }
    default:
      return <span>{props.content}</span>;
  }
};
const CustomModal = props => {
  let modalSettings = { footer: null, onCancel: () => props.handleReject() };

  if (props.type === "confirm") {
    modalSettings = {
      cancelText: props.cancelText,
      okText: props.okText,
      onOk: props.handleSubmit,
      title: props.title,
      content: props.content
    };
  }
  return (
    <Modal {...props} {...modalSettings}>
      <ModalContent {...props}></ModalContent>
    </Modal>
  );
};

export default CustomModal;
