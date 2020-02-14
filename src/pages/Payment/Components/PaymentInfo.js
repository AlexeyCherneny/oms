import React from "react";
import { Row, Col, Spin } from "antd";
import moment from "moment";

import {
  formatCurrency,
  displayDateFormat,
  programDateFormat,
  formatPaymentType
} from "../../../services/formatters";

const UserInfo = props => {
  const { payment, isLoading, isError } = props;

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <div>
      <Row>
        <Col span={6}>
          <h3>Тип:</h3>
        </Col>
        <Col span={18}>
          <h3>{formatPaymentType(payment.type)}</h3>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <h3>Сумма:</h3>
        </Col>
        <Col span={18}>
          <h3>{formatCurrency(payment.amount, payment.currency)}</h3>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <h3>Дата:</h3>
        </Col>
        <Col span={18}>
          <h3>
            {moment(payment.date, programDateFormat).format(displayDateFormat)}
          </h3>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <h3>Автор:</h3>
        </Col>
        <Col span={18}>
          <h3>{payment.author}</h3>
        </Col>
      </Row>

      {payment.type === "outcome" ? (
        <Row>
          <Col span={6}>
            <h3>Получатель:</h3>
          </Col>
          <Col span={18}>
            <h3>{payment.receiver}</h3>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={6}>
            <h3>Отправитель:</h3>
          </Col>
          <Col span={18}>
            <h3>{payment.payer}</h3>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserInfo;
