import React from "react";
import { Layout, Modal, Input, Icon } from "antd";
import { Route } from "react-router-dom";

import TreeView from "../Containers/TreeView";
import Document from "../Containers/Document";

import * as styles from './styles/index.module.scss';

const DocumentsPage = ({
  isLoading,
  isOpenNameModal,
  isOpenDeleteModal,
  isNewDoc,
  selectedDoc,
  docTitle,
  openNameModal,
  openDeleteModal,
  closeNameModal,
  closeDeleteModal,
  resetSelectedDoc,
  handleChangeTitle,
  handleSubmit,
  handleDelete,
}) => {
  return (
    <>
      <Modal
        visible={isOpenNameModal}
        title={isNewDoc ? 'Создать документ' : `Переименовать ${selectedDoc?.title || ''}` }
        cancelText="Отменить"
        okText={isNewDoc ? 'Создать' : 'Сохранить' }
        onCancel={closeNameModal}
        onOk={handleSubmit}
        confirmLoading={isLoading}
        cancelButtonProps={{ disabled: isLoading }}
        closable={!isLoading}
        afterClose={resetSelectedDoc}
        destroyOnClose
      >
        <Input value={docTitle} onChange={handleChangeTitle} />
      </Modal>
      <Modal
        visible={isOpenDeleteModal}
        title={`Удалить ${selectedDoc?.title || ''}`}
        cancelText="Отменить"
        okText={'Удалить'}
        onCancel={closeDeleteModal}
        onOk={handleDelete}
        confirmLoading={isLoading}
        cancelButtonProps={{ disabled: isLoading }}
        closable={!isLoading}
        afterClose={resetSelectedDoc}
        destroyOnClose
      >
        <span className={styles.iconConfirm}><Icon type="question-circle" /></span>
        Вы действительно желаете удалить документ?
      </Modal>
      <Layout style={{ height: '100%', maxWidth: 1280, margin: 'auto' }}>
        <Layout.Sider width={300} style={{ marginRight: 30 }}>
          <Route path="/app/cabinet/documents/:id?">
            <TreeView  
              openNameModal={openNameModal}
              openDeleteModal={openDeleteModal}
            />
          </Route>
        </Layout.Sider>
        <Layout.Content>
          <Route path="/app/cabinet/documents/:id" component={Document} />
        </Layout.Content>
      </Layout>
    </>
  );
};

export default DocumentsPage;
