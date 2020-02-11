import React from "react";
import { Modal } from "antd";

import ProjectForm from "../../Forms/Project";
import ProjectWorkForm from "../../Forms/ProjectWork";
import ProjectUser from "../../Forms/ProjectUser";
import RenameModal from "../../Forms/RenameModal";
import CustomSalary from "../../Forms/CustomSalary";

export const MODAL_TYPES = {
  project: 'project',
  projectWork: 'projectWork',
  projectUser: 'projectUser',
  customSalary: 'customSalary',
  rename: 'rename',
  confirm: 'confirm'
}

const ModalContent = props => {
  const { isLoading } = props;

  switch (props.type) {
    case MODAL_TYPES.project: {
      return (
        <ProjectForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
          isLoading={isLoading}
        />
      );
    }
    case MODAL_TYPES.projectWork: {
      return (
        <ProjectWorkForm
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
          isLoading={isLoading}
        />
      );
    }
    case MODAL_TYPES.projectUser: {
      return (
        <ProjectUser
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
          isLoading={isLoading}
        />
      );
    }
    case MODAL_TYPES.customSalary: {
      return (
        <CustomSalary
          {...props.form}
          handleSubmit={props.handleSubmit}
          handleReject={props.handleReject}
          isLoading={isLoading}
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

const getModalSettings = props => {
  const defaultProps = {
    afterClose: props.handleClose,
    onCancel: props.handleReject,
    destroyOnClose: true,
    closable: !props.isLoading,
  }

  switch (props.type) {
    case MODAL_TYPES.confirm: 
      return {
        ...defaultProps,
        onOk: props.handleSubmit,
        cancelText: props.cancelText,
        okText: props.okText,
        title: props.title,
        content: props.content,
        okButtonProps: {
          loading: props.isLoading,
        },
        cancelButtonProps: {
          disabled: props.isLoading,
        },
      };
    default: 
      return {
        ...defaultProps,
        footer: null,
      }
  }
}

const CustomModal = props => {
  const modalSettings = getModalSettings(props);

  return (
    <Modal {...props} {...modalSettings}>
      <ModalContent {...props}></ModalContent>
    </Modal>
  );
};

export default CustomModal;
