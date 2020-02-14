import { compose, withHandlers, withProps } from "recompose";
import { connect } from "react-redux";

import Document from "../Components/Document";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

const mapState = state => ({
  editedDocument: state.documents.editedDocument,
  isDownloading: selectors.isDocumentsDownloading(state),
  isUpdating: selectors.isDocumentUpdating(state),
  isDeleting: selectors.isDocumentDeleting(state),
});

const mapDispatch = {
  resetEdit: actions.resetEditDocument,
  editDocument: actions.editSelectedDocument,
  updateDocument: actions.updateDocumentRequest,
};

const DocumentContainer = compose(
  connect(mapState, mapDispatch),
  withProps(({ isDownloading, isUpdating, isDeleting, documents, selectedDocument }) => ({
    isDocument: selectedDocument && !documents.find(doc => doc.parentDocument === selectedDocument.uuid),
    isLoading: isDownloading || isUpdating(selectedDocument?.uuid) || isDeleting(selectedDocument?.uuid) || false,
  })),
  withHandlers({
    handleEditContent: ({ editDocument }) => content => editDocument({ content }),
    handleSaveDocument: ({ selectedDocument, editedDocument, updateDocument, resetEdit }) => () => {
      updateDocument({ ...selectedDocument, ...editedDocument }, { onSuccess: () => resetEdit() });
    },
  }),
)(Document);

export default DocumentContainer;
