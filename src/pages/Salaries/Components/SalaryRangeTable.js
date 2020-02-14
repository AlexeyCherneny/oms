import React from "react";
import { Table, Button } from "antd";

const SalaryActions = props => {
  const {
    salary,
    handleSalaryRangeEdit,
    handleSalaryRangeDelete,
    isSalaryUpdating,
    isSalaryDeleting
  } = props;

  const isUpdating = isSalaryUpdating(salary.uuid);
  const isDeleting = isSalaryDeleting(salary.uuid);

  const isDisabled = isUpdating || isDeleting;

  return (
    <>
      <Button
        onClick={() => handleSalaryRangeEdit(salary)}
        icon="edit"
        disabled={isDisabled}
        loading={isUpdating}
        style={{ marginRight: 8 }}
      />
      {salary.value !== 0 && (
        <Button
          onClick={() => handleSalaryRangeDelete(salary)}
          disabled={isDisabled}
          loading={isDeleting}
          icon="delete"
        />
      )}
    </>
  );
};

const staticColumns = [
  {
    title: "Месяц",
    dataIndex: "date",
    key: "date",
    align: "let"
  },
  {
    title: "Сумма",
    dataIndex: "value",
    key: "value",
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

const SalaryRangeTable = props => (
  <Table
    dataSource={props.tableData}
    rowKey="date"
    size="medium"
    ellipsis
    pagination={{
      pageSize: 5,
      style: { marginRight: 10 },
      size: "medium"
    }}
    loading={props.isDownloading}
    style={{ backgroundColor: "white" }}
  >
    {staticColumns.map(column => (
      <Table.Column
        {...column}
        render={column.renderFn && column.renderFn(props)}
      />
    ))}
  </Table>
);

export default SalaryRangeTable;
