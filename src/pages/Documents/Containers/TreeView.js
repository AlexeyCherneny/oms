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
    const selectedUuid = match.params.uuid || '';
    const parentUuids = tree.getAllParents(documents, selectedUuid);
    const rootChildren = documents.filter(doc => (!doc.parentDocument && doc.parentDocument !== 0));
    
    return {
      selectedUuid,
      rootChildren,
      expandedKeys: parentUuids,
    };
  }),
  withHandlers({
    handleSelectNode: ({ goToDocument, checkChanges, handleSelectDocument }) => documentUuids => {
      const uuid = documentUuids[0] || '';
      checkChanges(() => {
        handleSelectDocument(uuid);
        goToDocument(uuid);
      });
    },
    handleCreate: ({ openModal }) => selectedDoc => {
      const document = {
        title: 'Новый документ',
        content: '',
        parentDocument: get(selectedDoc, 'uuid', null),
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
    handleDelete: ({ openModal, selectedUuid, goToDocument }) => selectedDoc => openModal({
      type: "confirm",
      title: `Удалить документ ${selectedDoc?.title}`,
      content: DeleteModal,
      cancelText: "Отменить",
      okText: "Удалить",
      meta: {
        start: () => actions.deleteDocumentRequest(selectedDoc.uuid, {
          data: selectedDoc,
          onSuccess: () => selectedUuid === String(selectedDoc.uuid) && goToDocument(),
        }),
        success: () => actions.deleteDocumentSuccess(),
        failure: () => actions.deleteDocumentFailure(),
      }
    })
  })
)(TreeView);

export default TreeViewContainer;
