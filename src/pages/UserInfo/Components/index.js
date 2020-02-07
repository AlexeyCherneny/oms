import React from "react";
import { Row, Col, Avatar } from "antd";
import * as styles from "./styles.module.scss";

// import UserInfoForm from "../../../Components/Forms/UserInfo";

const UserInfo = props => {
  const { user } = props;

  if (!user) return null;
  console.log("user: ", user);
  return (
    <>
      <Row className={styles.userPhotoNameWrapper}>
        <Col span={6}>
          <Avatar src={user.photo} size={64} />
        </Col>
        <Col span={18}>
          <h1 className={styles.userName}>
            {user.firstName + " " + user.lastName + " " + user.middleName}
          </h1>
        </Col>
      </Row>
      <Row className={styles.addInfoWrapper}>
        {user.phone && (
          <Row>
            <Col span={18}>
              <h2>Телефон:</h2>
            </Col>
            <Col span={18}>
              <p className={styles.addInfo}>{user.phone}</p>
            </Col>
          </Row>
        )}
        {user.position && (
          <Row>
            <Col span={18}>
              <h2>Должность:</h2>
            </Col>
            <Col span={18}>
              <p className={styles.addInfo}>{user.position}</p>
            </Col>
          </Row>
        )}
        {user.birthday && (
          <Row>
            <Col span={18}>
              <h2>Дата рождения:</h2>
            </Col>
            <Col span={18}>
              <p className={styles.addInfo}>{user.birthday}</p>
            </Col>
          </Row>
        )}
        {user.email && (
          <Row>
            <Col span={18}>
              <h2>Email:</h2>
            </Col>
            <Col span={18}>
              <p className={styles.addInfo}>{user.email}</p>
            </Col>
          </Row>
        )}
      </Row>
    </>
  );
};

export default UserInfo;
