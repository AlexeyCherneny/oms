import React from "react";
import { Typography, Collapse, Icon } from "antd";

import ProjectWorkTable from "../Containers/ProjectWorksTable";
import ProjectUsers from "../Containers/ProjectUsers";
import Filter from "../Containers/Filter";
import { File } from "../../../Components";

const Title = props => (
  <div
    style={{
      background: "#001529",
      display: "flex",
      justifyContent: "space-between"
    }}
  >
    <Typography.Text
      style={{ color: "rgba(255, 255, 255, 0.65)", margin: 10 }}
      strong
    >
      {props.title}
    </Typography.Text>

    <>{props.extra}</>
  </div>
);

const Project = ({ children, attachments, usersTabs }) => {
  return (
    <>
      <Title title="Отработка" extra={<Filter />} />
      <ProjectWorkTable />

      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <Icon type="caret-right" rotate={isActive ? 90 : 0} />
        )}
      >
        <Collapse.Panel header="Вложения" key="1">
          {attachments.map((attachment, i) => (
            <File {...attachment} key={i} />
          ))}
        </Collapse.Panel>
      </Collapse>

      <ProjectUsers />
    </>
  );
};

export default Project;
