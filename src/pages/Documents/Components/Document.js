import React from "react";
import ReactQuill from "react-quill";
import { Button, Typography } from "antd";

import "react-quill/dist/quill.snow.css";

import * as styles from "./styles/Document.module.scss";

export const Document = ({ document, history, updateListRequest }) => {
  if (!document) {
    return null;
  }

  return (
    <>
      <div className={styles.header}>
        <Typography.Title>{document.title}</Typography.Title>
        <Button type="primary" size="large" onClick={() => {}}>
          {/* {editable ? "change" : "save"} */}
        </Button>
      </div>
      <ReactQuill enable={false} />
    </>
  );
};
