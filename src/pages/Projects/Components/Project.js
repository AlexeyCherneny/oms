import React from "react";
import { Typography } from "antd";

import ProjectWorkTable from "../Containers/ProjectWorksTable";
import ProjectAttachments from "../Containers/ProjectAttachments";
import Filter from "../Containers/Filter";

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

const Project = ({ children }) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Title title="Отработка" extra={<Filter />} />
      <ProjectWorkTable />
      <ProjectAttachments />
      {children}
    </div>
  );
};

export default Project;
