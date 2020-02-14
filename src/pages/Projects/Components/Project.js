import React from "react";
import { Button, Typography, Tooltip } from "antd";

import ProjectWorkTable from "../Containers/ProjectWorksTable";
import ProjectAttachments from "../Containers/ProjectAttachments";
import Filter from "../Containers/Filter";

import * as styles from "./styles/Project.module.scss";

const Extra = ({
  handleAddUser,
  project,
  readProjectWorks,
  ...props
}) => (
    <div className={styles.extraContainer}>
    <Tooltip placement="top" title="Добавить пользователей" >
      <Button 
        type="link"
        icon="usergroup-add"
        onClick={handleAddUser}
        className={styles.btnCreate}
        disabled={!project}
      />
    </Tooltip>
      <Tooltip placement="top" title="Обновить" >
        <Button
          type="link"
          icon="sync"
          onClick={readProjectWorks}
          className={styles.btn}
          disabled={!project}
        />
      </Tooltip>
    <Filter {...props} />
  </div>
);

const Title = ({ title, extra }) => (
  <div className={styles.titleContainer}>
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
  if (!props.project) return null;

  return (
    <div className={styles.container}>
      <Title 
        title={`Информация по проекту ${title}`} 
        extra={(<Extra {...props} />)} 
      />
      <ProjectWorkTable />
      <ProjectAttachments {...props} />
      {children}
    </div>
  );
};

export default Project;
