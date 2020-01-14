import React from "react";
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Button, Card } from "antd";

import Calendar from "../Containers/Calendar";
import EventDrawer from "../Containers/EventDrawer";

const EventsPage = props => (
  <Layout style={{ maxWidth: 1024, margin: "auto" }}>
    <Card style={{ minHeight: 640 }}>
      <EventDrawer />

      <Calendar />

      <Row type="flex" justify="end" style={{ marginTop: 20 }}>
        <Col>
          <Link to="/app/cabinet/events/new">
            <Button>
              Добавить мероприятие
            </Button>
          </Link>
        </Col>
      </Row>
    </Card>
  </Layout>
);

export default EventsPage;
