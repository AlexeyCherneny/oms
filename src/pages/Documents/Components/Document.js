import React from "react";
import ReactQuill from "react-quill";
import { Button, Typography } from "antd";
import Spinner from '../../../Components/Spinner';

import "react-quill/dist/quill.snow.css";

import * as styles from "./styles/Document.module.scss";
import "./styles/Document.scss";

const Document = ({ 
  document,
  isLoading, 
  handleEditContent,
  handleSaveDocument,
  handleClose,
}) => {
  if (!document) {
    return null;
  }

  return (
    <Spinner className={styles.container} spinning={isLoading} delay={250}>
      <div className={styles.header}>
        <Typography.Title level={2} >
          {document.title}
        </Typography.Title>
        <div>
          <Button 
            onClick={handleSaveDocument} 
            icon="save" 
            shape="circle" 
          />
          <Button 
            onClick={handleClose} 
            icon="close" 
            shape="circle" 
            style={{ marginLeft: 8 }} 
          />
        </div>
      </div>
      <div className={styles.editor}>
        <ReactQuill 
          className="custom-ql-editor" 
          enable={false} 
          theme="snow" 
          value={document.content} 
          onChange={handleEditContent} 
        />
      </div>
    </Spinner>
  );
};

export default Document;
