import React from "react";
import { Row, Col, Avatar } from "antd";

// import UserInfoForm from "../../../Components/Forms/UserInfo";

const UserInfo = props => {
  const { user } = props;

  if (!user) return null;

  return (
    <div>
      <Row style={{ marginBottom: 15 }}>
        <Col span={6}>
          <Avatar
            src={user.photo}
            size={64}
          />
        </Col>
        <Col span={18}>
          <h2>{user.first_name + " " + user.last_name}</h2>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <h3>Телефон:</h3>
        </Col>
        <Col span={18}>
          <h3>{user.phone}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <h3>Должность:</h3>
        </Col>
        <Col span={18}>
          <h3>{user.position}</h3>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
