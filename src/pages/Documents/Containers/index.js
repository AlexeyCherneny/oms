import { compose, lifecycle, withHandlers, withProps, mapProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEqual, pick, noop } from "lodash";

import DocumentsPage from "../Components";
import Authenticated from "../../../Components/HOC/Authenticated";
import { SaveModal } from "../Components/Modals";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { ALLOW_EDIT_DOCUMENT, ALLOW_EDIT_ACCESS } from "../constants";

const mapState = state => ({
  documents: selectors.getDocuments(state),
  selectedDocument: state.documents.selectedDocument,
  editedDocument: state.documents.editedDocument,
})

const mapDispatch = {
  readDocuments: actions.documentsRequest,
  readAccesses: actions.documentAccessesRequest,
  selectDocument: actions.selectDocument,
  resetEdit: actions.resetEditDocument,
  openModal: actions.openModal,
};

const DocumentsPageContainer = compose(
  Authenticated,
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ selectedDocument, match }) => ({
    path: match.path,
    canEditDocument: ALLOW_EDIT_DOCUMENT.includes(selectedDocument?.access),
    canEditAccess: ALLOW_EDIT_ACCESS.includes(selectedDocument?.access),
  })),
  withHandlers({
    goToDocument: ({ match, history }) => docId => history.push(match.url + (docId ? `/${docId}` : '')),
    handleSelectDocument: ({ documents, selectDocument, readAccesses }) => id => {
      const docId = String(id);
      const newDocument = (id && documents.find(doc => String(doc.uuid) === docId)) || null;
      selectDocument(newDocument);
      newDocument && ALLOW_EDIT_ACCESS.includes(newDocument.access) && readAccesses({ documentId: docId });
    },
    checkChanges: ({ selectedDocument, editedDocument, openModal, resetEdit }) => (callback = noop) => {
      const newDocument = { ...selectedDocument, ...editedDocument };

      if (selectedDocument && !isEqual(selectedDocument, newDocument)) {
        return openModal({
          type: "confirm",
          title: `Cохранить изменения в ${document.title}`,
          content: SaveModal,
          cancelText: "Отменить",
          okText: "Сохранить",
          meta: {
            start: () => actions.updateDocumentRequest(newDocument, { 
              onSuccess: () => {
                callback();
                resetEdit();
              },
            }),
            success: () => actions.updateDocumentSuccess(),
            failure: () => actions.updateDocumentFailure(),
            onDecline: () => {
              callback();
              resetEdit();
            }
          }
        });
      }
      callback();
    },
  }),
  withHandlers({
    openEdit: ({ goToDocument, selectedDocument }) => () => selectedDocument && goToDocument(`${selectedDocument.uuid}/edit`),
    openSettings: ({ goToDocument, selectedDocument }) => () => selectedDocument && goToDocument(`${selectedDocument.uuid}/settings`),
  }),
  lifecycle({
    componentDidMount() {
      this.props.readDocuments();
    },
  }),
  mapProps(props => pick(props, [
    'path',
    'documents',
    'selectedDocument',
    'editedDocument',
    'canEditDocument',
    'canEditAccess',
    'checkChanges',
    'handleSelectDocument',
    'openEdit',
    'openSettings',
    'goToDocument',
    'readDocuments',
    'openModal',
  ]))
)(DocumentsPage);

export default DocumentsPageContainer;
