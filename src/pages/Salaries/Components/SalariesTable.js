import React from "react";
import { Table } from "antd";

const staticColumns = [
  {
    title: "Месяц",
    dataIndex: "date",
    key: "date",
    align: "let"
  },
  {
    title: "Имя",
    dataIndex: "fullName",
    key: "fullName",
    align: "center"
  },
  {
    title: "Сумма",
    dataIndex: "amount",
    key: "amount",
    align: "center"
  }
];

const SalariesTable = props => (
  <Table
    dataSource={props.tableData}
    rowKey="uuid"
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

export default SalariesTable;
