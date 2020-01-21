import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { Route } from "react-router-dom";

import TreeView from "../Containers/TreeView";
import Document from "../Containers/Document";

const DocumentsPage = () => {
  return (
    <div>
      <Row gutter={24} type="flex">
        <Col span={3}></Col>
        <Col style={{ width: 300 }}>
          <Card>
            <TreeView />
          </Card>
        </Col>
        <Col style={{ flex: 1 }}>
          <Card>
            <Route path="/app/cabinet/documents/:id" component={Document} />
          </Card>
        </Col>
        <Col span={3}></Col>
      </Row>
    </div>
  );
};

export default DocumentsPage;
