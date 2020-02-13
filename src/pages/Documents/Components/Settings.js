import React from "react";
import { Drawer, Switch, Button, Row, Table, Col, Tag, Divider, Typography } from "antd";
import AccessForm, { AccessSelect } from "../../../Components/Forms/AddUsersAccess";

import * as styles from "./styles/Settings.module.scss";

import { PERMISSIONS, DOCUMENT_ROLES_DESCRIPTION } from "../constants";

const NodeAccessSelect = ({ access, node, updateAccess, isUpdating }) => {
  const [selectedAccess, setAccess] = React.useState(access);

  return (
    <Row gutter={8}>
      <Col span={20}>
        <AccessSelect
          onChange={setAccess}
          value={selectedAccess}
          permissions={PERMISSIONS}
          description={DOCUMENT_ROLES_DESCRIPTION}
          loading={isUpdating}
        />
      </Col>
      <Col span={4}>
        <Button
          onClick={() => updateAccess({ ...node.data, access: selectedAccess })}
          icon="check"
          loading={isUpdating}
        />
      </Col>
    </Row>
  );
}

const renderAccess = ({ isEditingNode, updateAccess, getIsUpdating }) => (access, node) => 
  isEditingNode(node.uuid) ? (
    <NodeAccessSelect 
      updateAccess={updateAccess}
      access={access}
      node={node}
      isUpdating={getIsUpdating(node?.uuid)}
    />
  ) : (
    <Tag
      className={styles.tag}
      color={DOCUMENT_ROLES_DESCRIPTION[access]?.color}
    >
      {DOCUMENT_ROLES_DESCRIPTION[access]?.name?.toUpperCase()}
    </Tag>
  );

const renderActions = ({ 
  isEditingNode, 
  addEditingNode, 
  deleteEditingNode, 
  deleteAccess, 
  getIsUpdating, 
  getIsDeleting 
}) => (uuid, node) => {
  const isUpdating = getIsUpdating(uuid);
  const isDeleting = getIsDeleting(uuid);

  return (
    <>
      <Button
        onClick={() => isEditingNode(uuid) ? deleteEditingNode(uuid) : addEditingNode(uuid)}
        icon="edit"
        disabled={isDeleting}
        loading={isUpdating}
        style={{ marginRight: 8 }}
      />
      <Button
        onClick={() => deleteAccess(node.data)}
        disabled={isUpdating}
        loading={isDeleting}
        icon="delete"
      />
    </>
  )
};

const Settings = ({
  isLoading,
  isOpenSettings,
  closeSettings,
  setSelectedUsers,
  setSelectedAccess,
  usersData,
  accessesData,
  changePrivateAccess,
  submitAddAccess,
  selectedDocument,
  isDocumentUpdating,
  ...props
}) => (
  <Drawer
    title="Настройки доступа к документу"
    width={640}
    onClose={closeSettings}
    visible={isOpenSettings}
    bodyStyle={{ paddingBottom: 80 }}
    destroyOnClose
  >
    <Row
      type="flex"
      align="middle"
      gutter={16}
    >
      <Col>
        <Switch 
          loading={isDocumentUpdating || isLoading}
          checked={selectedDocument?.private} 
          onChange={changePrivateAccess}
        />
      </Col>
      <Col>
        <span>Приватный доступ к документу</span>
      </Col>
    </Row>
    <Divider />
    <Typography.Paragraph className={styles.title}>
      Пригласить пользователей
    </Typography.Paragraph>
    <AccessForm 
      submitForm={submitAddAccess}
      isLoading={isLoading}
      usersData={usersData}
      permissions={PERMISSIONS}
      description={DOCUMENT_ROLES_DESCRIPTION}
    />
    <Divider style={{ marginTop: 12 }}/>
    <Table
      dataSource={accessesData}
      rowKey="uuid"
      loading={isLoading}
    >
      <Table.Column
        title="Пользователь"
        dataIndex="name"
        key="name"
        defaultSortOrder="ascend"
        sorter={(a, b) => a.name.localeCompare(b.name)}
      />
      <Table.Column
        title="Доступ"
        dataIndex="access"
        key="access"
        align="center"
        sorter={(a, b) => a.access.localeCompare(b.access)}
        filters={PERMISSIONS.map(item => ({
          text: DOCUMENT_ROLES_DESCRIPTION[item].name,
          value: item,
        }))}
        onFilter={(val, rec) => rec.access === val}
        width="40%"
        render={renderAccess(props)}
      />
      <Table.Column
        title="Управление"
        dataIndex="uuid"
        key="actions"
        align="center"
        width="20%"
        render={renderActions(props)}
      />
    </Table>
  </Drawer>
);

export default Settings;
