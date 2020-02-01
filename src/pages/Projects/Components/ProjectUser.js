import React from "react";

const ProjectUser = ({ rate }) => {
  if (!rate) return null;
  return (
    <div style={{ paddingTop: 20 }}>
      <div>{`Ставка работы: ${rate.workRate}`}</div>
      <div>{`Ставка переработки: ${rate.overtimeRate}`}</div>
    </div>
  );
};

export default ProjectUser;
