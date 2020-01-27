import { compose, withProps, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from 'lodash';

import { tree } from "../../../services/helpers";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import TreeView from "../Components/TreeView";
import { DeleteModal } from "../Components/Modals";

const mapState = state => ({
  isLoading: selectors.isDocumentsDownloading(state),
});

const TreeViewContainer = compose(
  withRouter,
  connect(mapState),
  withProps(({ documents, match }) => {
    const selectedId = match.params.id || '';
    const parentIds = tree.getAllParents(documents, selectedId);
    const rootChildren = documents.filter(doc => (!doc.parent_document && doc.parent_document !== 0));
    
    return {
      selectedId,
      rootChildren,
      expandedKeys: parentIds,
    };
  }),
  withHandlers({
    handleSelectNode: ({ goToDocument, checkChanges, handleSelectDocument }) => documentIds => {
      const id = documentIds[0] || '';
      checkChanges(() => {
        handleSelectDocument(id);
        goToDocument(id);
      });
    },
    handleCreate: ({ openModal }) => selectedDoc => {
      const document = {
        title: 'Новый документ',
        content: '',
        parent_document: get(selectedDoc, 'id', null),
      }

      return openModal({
        form: {
          submitTitle: 'Создать',
          rejectTitle: 'Отменить',
          initialValues: document,
        },
        title: 'Создать новый документ',
        type: 'rename',
        meta: {
          start: params => actions.createDocumentRequest(params),
          success: () => actions.createDocumentSuccess(),
          failure: () => actions.createDocumentFailure()
        }
      });
    },
    handleRename: ({ openModal }) => selectedDoc => openModal({
      form: {
        submitTitle: 'Сохранить',
        rejectTitle: 'Отменить',
        initialValues: selectedDoc,
      },
      title: `Переименовать документ ${selectedDoc.title}`,
      type: 'rename',
      meta: {
        start: params => actions.updateDocumentRequest(params),
        success: () => actions.updateDocumentSuccess(),
        failure: () => actions.updateDocumentFailure()
      }
    }),
    handleDelete: ({ openModal, selectedId, goToDocument }) => selectedDoc => openModal({
      type: "confirm",
      title: `Удалить документ ${selectedDoc?.title}`,
      content: DeleteModal,
      cancelText: "Отменить",
      okText: "Удалить",
      meta: {
        start: () => actions.deleteDocumentRequest(selectedDoc.id, {
          data: selectedDoc,
          onSuccess: () => selectedId === String(selectedDoc.id) && goToDocument(),
        }),
        success: () => actions.deleteDocumentSuccess(),
        failure: () => actions.deleteDocumentFailure(),
      }
    })
  })
)(TreeView);

export default TreeViewContainer;
