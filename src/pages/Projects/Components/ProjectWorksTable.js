import React from "react";
import { Table, Button } from "antd";
import Moment from "moment";

import './styles/ProjectWorkTable.scss';

const TableActions = ({
  projectWork, 
  handleProjectWorkEdit,
  handleDelete, 
  isProjectWorkUpdating
}) => {

  const isUpdating = isProjectWorkUpdating(projectWork.id);

  return (
    <>
      <Button
        onClick={() => handleProjectWorkEdit(projectWork.id)}
        icon="edit"
        loading={isUpdating}
        style={{ marginRight: 8 }}
      />
      <Button
        onClick={() => handleDelete(projectWork)}
        icon="delete"
        loading={isUpdating}
      />
    </>
  );
};

const staticColumns = [
  {
    title: "Пользователь",
    dataIndex: "fullName",
    key: "fullName",
    align: "left",
  },
  {
    title: "Отработано",
    key: "work",
    width: '25%',
    children: [
      {
        title: "Время",
        dataIndex: "workHours",
        key: "workHours",
        align: "center",
      },
      {
        title: "Сумма",
        dataIndex: "workAmount",
        key: "workAmount",
        align: "center",
      },
    ]
  },
  {
    title: "Переработка",
    key: "overtime",
    width: '25%',
    children: [
      {
        title: "Время",
        dataIndex: "overtimeHours",
        key: "overtimeHours",
        align: "center",
      },
      {
        title: "Сумма",
        dataIndex: "overtimeAmount",
        key: "overtimeAmount",
        align: "center",
      },
    ]
  },
  {
    title: <b>Итого</b>,
    dataIndex: "totalAmount",
    key: "totalAmount",
    width: '12%',
    render: text => (<b>{text}</b>)
  },
  {
    title: "Действия",
    key: "action",
    width: '12%',
    renderFn: props => (_, record) => (
      <TableActions projectWork={record} {...props} />
    )
  }
];

const addWarningClass = node => {
  const currentMonth = Moment().startOf('month');
  const hasHours = node.workHours || Moment(node.date).isAfter(currentMonth);
  return !hasHours ? 'row-warning' : '';
}

const ProjectWorkTable = props => {
  return (
    <Table
      className="antd-table-custom"
      rowClassName={addWarningClass}
      dataSource={props.tableData}
      rowKey="uuid"
      size="medium"
      loading={props.isLoadingData}
      pagination={{
        defaultPageSize: 5,
        style: { marginRight: 10 },
        size: "medium"
      }}
    >
      {staticColumns.map(({ renderFn, ...column }) => (
        <Table.Column
          align="center"
          render={renderFn && renderFn(props)}
          {...column}
        />
      ))}
    </Table>
  );
};

export default ProjectWorkTable;
