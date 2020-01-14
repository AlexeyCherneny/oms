import React from "react";
import { compose, withProps, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Typography, Modal } from "antd";

import selectors from "../../../store/selectors";
import drawerWrapper from "../../../Components/HOC/DrawerLayout";
import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";
import EditSalary from "../Components";

const BASE_URL = "/app/cabinet/salaries";

const { Title, Paragraph } = Typography;

const mapState = state => ({
  getSalaryById: selectors.getSalaryById(state),
  isSalaryUpdating: selectors.isSalaryUpdating(state),
  isSalaryDeleting: selectors.isSalaryDeleting(state)
});

const mapDispatch = {
  updateSalary: actions.updateSalaryRequest
};

const errTitle = <Title level={4}>Ошибка редактирования зарплаты</Title>;
const errMsg = (
  <>
    <Paragraph>При редактировании зарплаты произошла ошибка.</Paragraph>
    <Paragraph>
      Подробную информацию о проблеме можно просмотреть консоли.
    </Paragraph>
  </>
);

const EditSalaryContainer = compose(
  Authenticated,
  withRouter,
  drawerWrapper({
    title: "Зарплата",
    width: 640,
    defaultBackLocation: BASE_URL
  }),
  connect(mapState, mapDispatch),
  withProps(({ getSalaryById, match, isSalaryUpdating, isSalaryDeleting }) => {
    const salary = getSalaryById(match.params.id);

    const isUpdating = isSalaryUpdating(match.params.id);
    const isDeleting = isSalaryDeleting(match.params.id);

    const disabled = isUpdating || isDeleting;

    return {
      initialValues: salary,
      disabled,
      isLoading: isUpdating
    };
  }),
  withHandlers({
    handleSubmit: ({ updateSalary, history, match }) => params => {
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

      updateSalary(
        {
          id: match.params.id,
          params
        },
        meta
      );
    }
  })
)(EditSalary);

export default EditSalaryContainer;
