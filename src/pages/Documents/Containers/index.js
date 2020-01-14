import React from "react";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";

import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";

import DocumentsPage from "../Components";

const mapState = ({ documents }) => ({
  ...documents
});

const mapDispatch = {
  fetchDocumentsList: actions.documentsListRequest,
};

const DocumentsPageContainer = compose(
  Authenticated,
  connect(mapState, mapDispatch),
  lifecycle({
    componentDidMount() {
      const { fetchDocumentsList } = this.props;

      fetchDocumentsList();
    }
  })
)(DocumentsPage);

export default DocumentsPageContainer;
