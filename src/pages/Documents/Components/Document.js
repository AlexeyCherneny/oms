import React from "react";
import ReactQuill from "react-quill";
import { Button, Typography } from "antd";

import Spinner from '../../../Components/Spinner';

import "react-quill/dist/quill.snow.css";
import "./styles/Document.scss";
import * as styles from "./styles/Document.module.scss";

const Document = ({ 
  selectedDocument,
  isLoading,
  isOpenEdit,
  openEdit,
  closeEdit,
  openSettings,
  handleSaveDocument,
  closeDocument,
  canEditDocument,
  canEditAccess,
  editedDocument,
  handleEditContent,
  isDocument,
}) => {
  if (!isDocument) {
    return null;
  }

  return (
    <Spinner className={styles.container} spinning={isLoading} delay={250}>
      <div className={styles.header}>
        <Typography.Title level={2} >
          {selectedDocument.title}
        </Typography.Title>
        <div>
          {!isOpenEdit && canEditDocument && (
            <Button
              onClick={openEdit}
              icon="edit"
              shape="circle"
            />
          )}
          {isOpenEdit && (
            <Button
              onClick={handleSaveDocument}
              icon="save"
              shape="circle"
            />
          )}
          {canEditAccess && !isOpenEdit && (
              <Button
                onClick={openSettings}
                icon="setting"
                shape="circle"
                style={{ marginLeft: 8 }}
              />
          )}
          {isOpenEdit && (
            <Button
              onClick={closeEdit}
              icon="rollback"
              shape="circle"
              style={{ marginLeft: 8 }}
            />
          )}
          <Button
            onClick={closeDocument}
            icon="close"
            shape="circle"
            style={{ marginLeft: 8 }}
          />
        </div>
      </div>
      <div className={styles.editor}>
        {isOpenEdit ? (
          <ReactQuill
            className="custom-ql-editor"
            enable={false}
            theme="snow"
            value={editedDocument?.content || selectedDocument.content}
            onChange={handleEditContent}
          />
        ) : (
            <div
              dangerouslySetInnerHTML={{ __html: selectedDocument.content }}
              className={styles.content}
            />
          )}
      </div>
    </Spinner>
  );
};

export default Document;
