import React from "react";
import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Typography } from "antd";

import actions from "../../../store/actions";

import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import CreateSalary from "../Components";

const { Title, Paragraph } = Typography;
const BASE_URL = "/app/cabinet/salaries";

const errTitle = <Title level={4}>Ошибка создания зарплаты</Title>;
const errMsg = (
  <>
    <Paragraph>При создании зарплаты произошла ошибка.</Paragraph>
    <Paragraph>
      Подробную информацию о проблеме можно просмотреть консоли.
    </Paragraph>
  </>
);

const mapState = ({ salaries }) => ({
  isLoading: salaries.isCreating
});

const mapDispatch = {
  createSalary: actions.createSalaryRequest
};

const CreateSalaryContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  drawerWrapper({
    title: "Создать заработную плату",
    width: 640,
    defaultBackLocation: BASE_URL
  }),
  withHandlers({
    handleSubmit: ({ createSalary, history }) => params => {
      const meta = {
        onSuccess: () => history.push(BASE_URL),
        onFailure: () =>
          Modal.error({
            title: errTitle,
            content: errMsg,
            width: 540,
            okText: "Продолжить"
          })
      };
      createSalary({ params }, meta);
    }
  })
)(CreateSalary);

export default CreateSalaryContainer;
