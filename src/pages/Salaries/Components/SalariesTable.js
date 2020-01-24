import React from "react";
import { Table, Button } from "antd";

const SalaryActions = props => {
  const {
    salary,
    handleSalaryEdit,
    isSalaryUpdating,
    handleSalaryDelete,
    isSalaryDeleting
  } = props;

  const isUpdating = isSalaryUpdating(salary.id);
  const isDeleting = isSalaryDeleting(salary.id);

  const isDisabled = isUpdating || isDeleting;

  return (
    <>
      <Button
        onClick={() => handleSalaryEdit(salary.id)}
        icon="edit"
        disabled={isDisabled}
        loading={isUpdating}
        style={{ marginRight: 8 }}
      />
      <Button
        onClick={() => handleSalaryDelete(salary.id)}
        disabled={isDisabled}
        loading={isDeleting}
        icon="delete"
      />
    </>
  );
};

const staticColumns = [
  {
    title: "Имя",
    dataIndex: "full_name",
    key: "full_name",
    align: "let"
  },
  {
    title: "Месяц",
    dataIndex: "date",
    key: "date",
    align: "center"
  },
  {
    title: "Сумма",
    dataIndex: "amount",
    key: "amount",
    align: "center"
  },
  {
    title: "Действия",
    key: "action",
    width: "150px",
    align: "center",
    renderFn: props => (_, record) => (
      <SalaryActions salary={record} {...props} />
    )
  }
];

const SalariesTable = props => (
  <Table
    dataSource={props.tableData}
    rowKey="id"
    pagination={{ pageSize: 5 }}
    loading={props.isDownloading}
  >
    {staticColumns.map(column => (
      <Table.Column
        {...column}
        render={column.renderFn && column.renderFn(props)}
      />
    ))}
  </Table>
);

export default SalariesTable;
