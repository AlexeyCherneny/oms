import React from "react";
import { Table, Button, Typography } from "antd";

const { Text } = Typography;

const staticColumns = [
  {
    title: "Название",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Сумма",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Инициатор",
    dataIndex: "author",
    key: "author"
  },
  {
    title: "Тип",
    dataIndex: "type",
    key: "type"
  }
];

class UsersList extends React.Component {
  renderStaticColumns = () => {
    return staticColumns.map(column => (
      <Table.Column
        title={column.title}
        dataIndex={column.dataIndex}
        key={column.key}
        render={(text, columnItem) => {
          if (column.dataIndex === "type") {
            const textColor =
              columnItem.type === "Доход" ? "#52c41a" : "#f5222d";
            return (
              <Text
                style={{
                  color: textColor
                }}
              >
                {text}
              </Text>
            );
          }
          return <Text>{text}</Text>;
        }}
      />
    ));
  };

  renderActionColumns = () => {
    const {
      handleDelete,
      handleEdit,
      handleInfo,
      isPaymentLoading
    } = this.props;
    return (
      <Table.Column
        title="Действия"
        key="action"
        render={(text, record) => {
          const isLoading = isPaymentLoading(record);

          return (
            <div>
              <Button
                onClick={() => handleEdit(record)}
                icon="edit"
                style={{ marginRight: 8 }}
                loading={isLoading}
              />
              <Button
                onClick={() => handleInfo(record)}
                icon="info-circle"
                style={{ marginRight: 8 }}
                loading={isLoading}
              />
              <Button
                onClick={() => handleDelete(record)}
                icon="delete"
                loading={isLoading}
              />
            </div>
          );
        }}
      />
    );
  };

  render() {
    const {
      payments,
      isError,
    } = this.props;

    if (isError) {
      return null;
    }

    return (
      <Table
        dataSource={payments}
        pagination={false}
        rowKey="id"
        style={{ width: "100%" }}
      >
        {this.renderStaticColumns()}

        {this.renderActionColumns()}
      </Table>
    );
  }
}

export default UsersList;
