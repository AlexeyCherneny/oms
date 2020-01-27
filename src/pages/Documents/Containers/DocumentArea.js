import { compose, lifecycle, withHandlers, withProps, mapProps } from "recompose";
import { withRouter } from "react-router-dom";
import { isEqual, pick } from "lodash";

import DocumentArea from "../Components/DocumentArea";

const DocumentAreaContainer = compose(
  withRouter,
  withProps(({ selectedDocument, match }) => {
    const { operation, id } = match.params;
    const selectedId = id || '';

    const isOpenEdit = operation === 'edit';
    const isOpenSettings = Boolean(selectedDocument) && operation === 'settings';

    return {
      isOpenEdit,
      isOpenSettings,
      selectedId,
    }
  }),
  withHandlers({
    closeSettings: ({ goToDocument, selectedId }) => () => goToDocument(selectedId),
    closeEdit: ({ goToDocument, selectedId, checkChanges }) => () => {
      checkChanges(() => selectedId && goToDocument(selectedId));
    },
    closeDocument: ({ goToDocument, checkChanges, handleSelectDocument }) => () => {
      checkChanges(() => {
        handleSelectDocument();
        goToDocument();
      });
    },
    checkPermission: ({ isOpenEdit, isOpenSettings, canEditAccess, canEditDocument, selectedDocument, goToDocument }) => () => {
      if (isOpenEdit && selectedDocument && !canEditDocument) goToDocument(selectedDocument.id);
      if (isOpenSettings && selectedDocument && !canEditAccess) goToDocument(selectedDocument.id);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { checkPermission, selectedId, handleSelectDocument } = this.props;
      handleSelectDocument(selectedId);
      checkPermission();
    },
    componentDidUpdate(prevProps) {
      const { selectedDocument, checkPermission, documents, selectedId, handleSelectDocument } = this.props;
      if (!isEqual(documents, prevProps.documents)) handleSelectDocument(selectedId);
      if (!isEqual(selectedDocument, prevProps.selectedDocument)) checkPermission();
    }
  }),
  mapProps(props => pick(props, [
    'documents',
    'selectedDocument',
    'handleSaveDocument',
    'isOpenEdit',
    'isOpenSettings',
    'canEditDocument',
    'canEditAccess',
    'openEdit',
    'openSettings',
    'closeEdit',
    'closeSettings',
    'closeDocument',
  ]))
)(DocumentArea);

export default DocumentAreaContainer;
