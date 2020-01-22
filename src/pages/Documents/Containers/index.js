import { compose, lifecycle, withHandlers, withStateHandlers, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import DocumentsPage from "../Components";
import Authenticated from "../../../Components/HOC/Authenticated";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { BASE_URL } from "../constants";

const initialState = {
  isOpenNameModal: false,
  isOpenDeleteModal: false,
  isNewDoc: false,
  selectedDoc: null,
  docTitle: '',
  currentDocId: '',
};

const mapState = state => ({
  documents: selectors.getDocuments(state),
  isCreating: state.documents.isCreating,
  isUpdating: selectors.isDocumentUpdating(state),
  isDeleting: selectors.isDocumentDeleting(state),
});

const mapDispatch = {
  readDocuments: actions.documentsRequest,
  createDocument: actions.createDocumentRequest,
  updateDocument: actions.updateDocumentRequest,
  deleteDocument: actions.deleteDocumentRequest,
};

const DocumentsPageContainer = compose(
  Authenticated,
  withRouter,
  connect(mapState, mapDispatch),
  lifecycle({
    componentDidMount() {
      this.props.readDocuments();
    }
  }),
  withStateHandlers(
    { ...initialState }, 
    {
      openNameModal: state => (selectedDoc, isNewDoc = false) => ({
        ...state,
        isOpenNameModal: true,
        isNewDoc,
        selectedDoc,
        docTitle: isNewDoc ? 'Новый документ' : (selectedDoc?.title || '')
      }),
      openDeleteModal: state => (selectedDoc, currentDocId) => ({
        ...state,
        isOpenDeleteModal: true,
        currentDocId,
        selectedDoc,
      }),
      closeNameModal: state => () => ({
        ...state,
        isOpenNameModal: false,
      }),
      closeDeleteModal: state => () => ({
        ...state,
        isOpenDeleteModal: false,
      }),
      handleChangeTitle: state => event => ({
        ...state,
        docTitle: event.target.value,
      }),
      resetSelectedDoc: state => () => ({
        ...state,
        selectedDoc: null,
        title: '',
        currentDocId: ''
      }),
    }
  ),
  withHandlers({
    handleSubmit: ({ isNewDoc, selectedDoc, docTitle, createDocument, updateDocument, closeNameModal, history }) => () => {
      if (isNewDoc) {
        const document = {
          title: docTitle,
          content: '',
          parent_document: selectedDoc?.id || null
        };
        createDocument(document, {
          onSuccess: doc => {
            closeNameModal();
            history.push(BASE_URL + `/${doc.id}`);
          },
          onFailure: closeNameModal,
        });
      } else {
        const document = { ...selectedDoc, title: docTitle };

        updateDocument(document, {
          onSuccess: closeNameModal,
          onFailure: closeNameModal,
        });
      }
    },
    handleDelete: ({ selectedDoc, currentDocId, deleteDocument, closeDeleteModal, history }) => () => {
      deleteDocument(selectedDoc.id, {
        onSuccess: () => {
          closeDeleteModal();
          if (currentDocId === String(selectedDoc.id)) history.push(BASE_URL);
        },
        onFailure: closeDeleteModal
      });
    }
  }),
  withProps(({ isDeleting, isUpdating, isCreating, selectedDoc }) => ({
    isLoading: isCreating || isUpdating(selectedDoc?.id) || isDeleting(selectedDoc?.id) || false,
  })),
)(DocumentsPage);

export default DocumentsPageContainer;
