import React from "react";
import { Modal } from "antd";

import ProjectForm from "../../Forms/Project";
import ProjectWorkForm from "../../Forms/ProjectWork";

const ModalContent = props => {
  switch (props.type) {
    case "project": {
      return (
        <ProjectForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
        />
      );
    }
    case "projectWork": {
      return (
        <ProjectWorkForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
        />
      );
    }
    default:
      return <span>{props.content}</span>;
  }
};
const CustomModal = props => {
  let modalSettings = { footer: null };

  if (props.type === "confirm") {
    modalSettings = {
      cancelText: props.cancelText,
      okText: props.okText,
      onOk: props.handleSubmit,
      onCancel: props.handleReject,
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
