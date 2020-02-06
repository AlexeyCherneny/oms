import React from "react";
import { Collapse, Icon } from "antd";

import Upload from "../../../Components/FormElements/Upload/Upload";

import { File } from "../../../Components";

const ProjectAttachments = ({ attachments, handleUpload }) => {
  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <Icon type="caret-right" rotate={isActive ? 90 : 0} />
      )}
    >
      <Collapse.Panel
        header="Вложения"
        key="1"
        extra={<Upload handleUpload={handleUpload} />}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {attachments.map(attachment => (
            <div
              key={attachment.id}
              style={{
                flex: "1 1 auto",
                width: "33%",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              <File {...attachment} />
            </div>
          ))}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default ProjectAttachments;
