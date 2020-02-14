import React from "react";
import Moment from "moment";
import { Table, Button } from "antd";
import { DATE_FORMATS } from "../../../services/constants";
import { NavLink } from "react-router-dom";

const getRenderActions = ({ 
  BASE_URL, 
  getIsDeleting,
  deleteUsersPlan,
}) => (_, record) => {
  const isDeleting = getIsDeleting(record.date_from);

  return (
    <>
      <NavLink 
        to={`${BASE_URL}/edit/${record.date_from}`} 
        style={{ marginRight: 8 }}
      >
        <Button icon="edit" />
      </NavLink>
      <Button
        onClick={() => deleteUsersPlan(record.date_from)}
        loading={isDeleting}
        disabled={isDeleting}
        icon="delete"
      />
    </>
  );
};

const getColumns = props => [
  {
    title: "Период",
    dataIndex: "date_to",
    key: "date_to",
    render: value => Moment(value).format(DATE_FORMATS.monthString),
  },
  {
    title: "Ожидаемая численность",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Новые сотрудники",
    dataIndex: "step",
    key: "step",
  },
  {
    title: "Действия",
    dataIndex: "actions",
    key: "actions",
    render: getRenderActions(props),
  }
];

class PlanTable extends React.PureComponent {
  renderColumns = () => 
    getColumns(this.props).map(column => (
      <Table.Column 
        align="center" 
        {...column} 
      />
    )
  );

  render() {
    const { data, isLoading, goToPage, page } = this.props;

    return (
      <Table 
        dataSource={data} 
        pagination={{ 
          pageSize: 12,
          defaultCurrent: Number(page),
          onChange: goToPage,
          hideOnSinglePage: true,
        }} 
        rowKey='date_to'
        loading={isLoading}
      >
        {this.renderColumns()}
      </Table>
    );
  }
}

export default PlanTable;
