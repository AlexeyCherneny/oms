import React from "react";
import Moment from "moment";
import { DatePicker, Select } from "antd";

import { Card } from "../../../Components";
import ProjectCardForm from "../../../Components/Forms/ProjectCard";
import { DATE_FORMATS } from "../../../services/constants";
import * as styles from "./styles/ProjectsCard.module.scss";

const Footer = ({ handleChangeDate }) => (
  <div className={styles.footerContainer}>
    <span>Период:</span>
    <DatePicker.MonthPicker
      onChange={handleChangeDate}
      format={DATE_FORMATS.monthString}
      placeholder="Выберите период"
      defaultValue={Moment()}
      size="small"
      className={styles.datePicker}
    />
  </div>
);

const ProjectCard = ({
  handleLoadProjectWork,
  handleSelectProject,
  updateProjectWork,
  selectedProject,
  projectsData,
  selectedWork,
  isLoading,
  isUpdating
}) => (
  <Card
    header="Информация о проектах"
    tooltip="Информация о текущих проектах и отработанном времени"
    footer={(<Footer handleChangeDate={handleLoadProjectWork} />)}
  >
    <Select
      size="small"
      onChange={handleSelectProject}
      className={styles.select}
      value={String(selectedProject)}
      loading={isLoading}
    >
      {projectsData.map(project => (
        <Select.Option key={project.uuid}>{project.title}</Select.Option>
      ))}
    </Select>
    <ProjectCardForm
      initialValues={selectedWork}
      handleSubmit={updateProjectWork}
      isLoading={isLoading}
      isUpdating={isUpdating}
    />
  </Card>
)

export default ProjectCard;
