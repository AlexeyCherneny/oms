import React from "react";
import {  Table, Button,  } from "antd";

const UserActions = props => {
  const {
    user,
    handleUserInfo,
    handleUserEdit,
    isUserUpdating,
    handleUserDelete,
    isUserDeleting
  } = props;

  const isUpdating = isUserUpdating(user.uuid);
  const isDeleting = isUserDeleting(user.uuid);

  const isDisabled = isUpdating || isDeleting;

  return (
    <>
      <Button
        onClick={() => handleUserEdit(user.uuid)}
        icon="edit"
        disabled={isDisabled}
        loading={isUpdating}
        style={{ marginRight: 8 }}
      />
      <Button
        onClick={() => handleUserInfo(user.uuid)}
        disabled={isDisabled}
        icon="info-circle"
        style={{ marginRight: 8 }}
      />
      <Button
        onClick={() => handleUserDelete(user.uuid, { user })}
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
    title: "Позиция",
    dataIndex: "position",
    key: "position",
    align: "center"
  },
  {
    title: "Действия",
    key: "action",
    width: "150px",
    align: "center",
    renderFn: props => (_, record) => <UserActions user={record} {...props} />
  }
];

const UsersList = props => (
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

export default UsersList;
