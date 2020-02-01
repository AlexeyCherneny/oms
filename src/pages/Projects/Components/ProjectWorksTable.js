import React from "react";
import { Table, Button } from "antd";

const TableActions = props => {
  const { projectWork, handleProjectWorkEdit, isProjectWorkUpdating } = props;

  const isUpdating = isProjectWorkUpdating(projectWork.id);

  const isDisabled = isUpdating;

  return (
    <>
      <Button
        onClick={() => handleProjectWorkEdit(projectWork.id)}
        icon="edit"
        disabled={isDisabled}
        loading={isUpdating}
        style={{ marginRight: 8 }}
        size="small"
      />
    </>
  );
};

const staticColumns = [
  {
    title: "Пользователь",
    dataIndex: "fullName",
    key: "fullName",
    align: "center"
  },
  {
    title: "Время",
    dataIndex: "workHours",
    key: "workHours",
    align: "center"
  },
  {
    title: "Сумма работы",
    dataIndex: "workAmount",
    key: "workAmount",
    align: "center"
  },
  {
    title: "Переработка",
    dataIndex: "overtimeHours",
    key: "overtimeHours",
    align: "center"
  },
  {
    title: "Сумма переработок",
    dataIndex: "overtimeAmount",
    key: "overtimeAmount",
    align: "center"
  },
  {
    title: "Действия",
    key: "action",
    width: "100px",
    align: "center",
    renderFn: props => (_, record) => (
      <TableActions projectWork={record} {...props} />
    )
  }
];

const ProjectWorkTable = props => {
  return (
    <Table
      dataSource={props.tableData}
      rowKey="id"
      size="medium"
      loading={props.isDownloading}
      pagination={{
        defaultPageSize: 5,
        style: { marginRight: 10 },
        size: "medium"
      }}
    >
      {staticColumns.map(column => (
        <Table.Column
          {...column}
          render={column.renderFn && column.renderFn(props)}
        />
      ))}
    </Table>
  );
};

export default ProjectWorkTable;
