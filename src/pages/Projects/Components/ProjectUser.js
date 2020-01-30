import React from "react";

const ProjectUser = ({ rate }) => {
  if (!rate) return null;
  return <div>{`Ставка на проекта: ${rate.rate}`}</div>;
};

export default ProjectUser;
