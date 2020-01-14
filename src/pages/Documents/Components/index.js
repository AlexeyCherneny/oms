import React from "react";
import { Layout, Card, Row, Col, Typography, Button, Spin } from "antd";
import { Route } from "react-router-dom";

import { TreeView } from './TreeView'
import Document from '../Containers/DocumentContainer'

const DocumentsPage = ({ documentsList: { data, isLoading, listAsTree }, history }) => {
  if (isLoading) {
    return (
      <Row gutter={24} type="flex" justify="space-between">
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </Col>
      </Row>
    )
  }

  return (
    <div>
      <Row gutter={24} type="flex" justify="space-between">
        <Col span={4}></Col>
        <Col span={16} style={{ minWidth: 540 }}>
          <Card>
            <Row gutter={24} type="flex" justify="space-between" align="middle">
              <Col>
                <Typography.Title style={{ marginBottom: 0 }}>
                  Документы
                </Typography.Title>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={4}></Col>
      </Row>

      <Row gutter={24} type="flex" justify="space-between">
        <Col span={8}>
          <Card>
            <TreeView history={history} documents={data} tree={listAsTree} />
          </Card>
        </Col>
        <Col span={16} style={{ minWidth: 540 }}>
          <Card>
            <Route path="/app/cabinet/documents/:id" component={Document} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DocumentsPage;
