import React from "react";
import { Button, Typography, Tooltip } from "antd";

import ProjectWorkTable from "../Containers/ProjectWorksTable";
import ProjectAttachments from "../Containers/ProjectAttachments";
import Filter from "../Containers/Filter";

import * as styles from "./styles/Project.module.scss";

const Extra = ({
  handleAddUser,
  project,
  ...props
}) => !project ? null : (
    <div className={styles.extraContainer}>
    <Tooltip placement="top" title="Добавить пользователей" >
      <Button 
        type="link"
        icon="usergroup-add"
        onClick={handleAddUser}
        className={styles.btnCreate}
      />
    </Tooltip>
    <Filter {...props} />
  </div>
);

const Title = ({ title, extra }) => (
  <div
    style={{
      background: "#001529",
      display: "flex",
      justifyContent: "space-between"
    }}
  >
    <Typography.Text
      className={styles.title}
      strong
    >
      {title}
    </Typography.Text>

    {extra}
  </div>
);

const Project = ({ 
  children, 
  title,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <Title 
        title={`Информация по проекту ${title}`} 
        extra={(<Extra {...props} />)} 
      />
      <ProjectWorkTable />
      <ProjectAttachments 
        {...props}
      />
      {children}
    </div>
  );
};

export default Project;
