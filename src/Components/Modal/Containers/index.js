import { connect } from "react-redux";
// import { get } from "lodash";
import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";

import Modal from "../Components";
import actions from "../../../store/actions";

const mapState = ({ modal }) => ({
  ...modal
});

const mapDispatch = {
  handleSubmit: actions.confirmModal,
  handleReject: actions.declineModal
};

const ModalContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ isOpen }) => {
    return {
      visible: isOpen
    };
  })
)(Modal);

export default ModalContainer;
