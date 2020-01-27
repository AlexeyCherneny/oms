import React from "react";
import { Modal } from "antd";

import ProjectForm from "../../Forms/Project";
import ProjectWorkForm from "../../Forms/ProjectWork";
import RenameModal from "../../Forms/RenameModal";

const MODAL_TYPES = {
  project: 'project',
  projectWork: 'projectWork',
  rename: 'rename',
  confirm: 'confirm'
}

const ModalContent = props => {
  switch (props.type) {
    case MODAL_TYPES.project: {
      return (
        <ProjectForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
        />
      );
    }
    case MODAL_TYPES.projectWork: {
      return (
        <ProjectWorkForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
        />
      );
    }
    case MODAL_TYPES.rename: {
      return (
        <RenameModal 
          {...props.form}
          isLoading={props.isLoading}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
        />
      )
    }
    default:
      return typeof props.content === 'object' 
        ? props.content
        : <span>{props.content}</span>;
  }
};
const CustomModal = props => {
  let modalSettings = { footer: null };

  if (props.type === MODAL_TYPES.confirm) {
    modalSettings = {
      cancelText: props.cancelText,
      okText: props.okText,
      onOk: props.handleSubmit,
      onCancel: props.handleReject,
      title: props.title,
      content: props.content,
      closable: !props.isLoading,
      confirmLoading: props.isLoading,
      cancelButtonProps: { disabled: props.isLoading }
    };
  }
  return (
    <Modal {...props} {...modalSettings}>
      <ModalContent {...props}></ModalContent>
    </Modal>
  );
};

export default CustomModal;
