import { compose, withHandlers, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Document from "../Components/Document";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { BASE_URL } from "../constants";

const mapState = state => ({
  getDocumentById: selectors.getDocumentById(state),
  document: state.documents.currentDocument,
  isDownloading: selectors.isDocumentsDownloading(state),
  isUpdating: selectors.isDocumentUpdating(state),
  isDeleting: selectors.isDocumentDeleting(state),
});

const mapDispatch = {
  updateListRequest: actions.updateListRequest,
  handleEditDocument: actions.editCurrentDocument,
  readDocuments: actions.documentsRequest,
  updateDocument: actions.updateDocumentRequest,
};

const DocumentContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withHandlers({
    handleEditContent: ({ handleEditDocument }) => content => {
      handleEditDocument({ content });
    },
    handleClose: ({ history }) => () => {
      history.push(BASE_URL);
    },
    handleSaveDocument: ({ document, updateDocument }) => () => {
      updateDocument(document);
    }
  }),
  withProps(({ isDownloading, isUpdating, isDeleting, document }) => ({
    isLoading: isDownloading || isUpdating(document?.id) || isDeleting(document?.id) || false,
  })),
)(Document);

export default DocumentContainer;
