import React from "react";
import { Row, Col, Avatar } from "antd";
import * as styles from "./styles.module.scss";

// import UserInfoForm from "../../../Components/Forms/UserInfo";

const UserInfo = props => {
  const { user } = props;

  if (!user) return null;

  return (
    <>
      <Row className={styles.userPhotoNameWrapper}>
        <Col span={6}>
          <Avatar src={user.photo} size={64} />
        </Col>
        <Col span={18}>
          <h1 className={styles.userName}>
            {user.first_name + " " + user.last_name + " " + user.middle_name}
          </h1>
        </Col>
      </Row>
      <Row className={styles.addInfoWrapper}>
        <Row>
          <Col span={18}>
            <h2>Телефон:</h2>
          </Col>
          <Col span={18}>
            <p className={styles.addInfo}>{user.phone}</p>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <h2>Должность:</h2>
          </Col>
          <Col span={18}>
            <p className={styles.addInfo}>{user.position}</p>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <h2>Дата рождения:</h2>
          </Col>
          <Col span={18}>
            <p className={styles.addInfo}>{user.birthday}</p>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <h2>Email:</h2>
          </Col>
          <Col span={18}>
            <p className={styles.addInfo}>{user.email}</p>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default UserInfo;
