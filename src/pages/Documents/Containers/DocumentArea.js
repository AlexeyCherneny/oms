import { compose, lifecycle, withHandlers, withProps, mapProps } from "recompose";
import { withRouter } from "react-router-dom";
import { isEqual, pick } from "lodash";

import DocumentArea from "../Components/DocumentArea";

const DocumentAreaContainer = compose(
  withRouter,
  withProps(({ selectedDocument, match }) => {
    const { operation, uuid } = match.params;
    const selectedUuid = uuid || '';

    const isOpenEdit = operation === 'edit';
    const isOpenSettings = Boolean(selectedDocument) && operation === 'settings';

    return {
      isOpenEdit,
      isOpenSettings,
      selectedUuid,
    }
  }),
  withHandlers({
    closeSettings: ({ goToDocument, selectedUuid }) => () => goToDocument(selectedUuid),
    closeEdit: ({ goToDocument, selectedUuid, checkChanges }) => () => {
      checkChanges(() => selectedUuid && goToDocument(selectedUuid));
    },
    closeDocument: ({ goToDocument, checkChanges, handleSelectDocument }) => () => {
      checkChanges(() => {
        handleSelectDocument();
        goToDocument();
      });
    },
    checkPermission: ({ isOpenEdit, isOpenSettings, canEditAccess, canEditDocument, selectedDocument, goToDocument }) => () => {
      if (isOpenEdit && selectedDocument && !canEditDocument) goToDocument(selectedDocument.uuid);
      if (isOpenSettings && selectedDocument && !canEditAccess) goToDocument(selectedDocument.uuid);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { checkPermission, selectedUuid, handleSelectDocument } = this.props;
      handleSelectDocument(selectedUuid);
      checkPermission();
    },
    componentDidUpdate(prevProps) {
      const { selectedDocument, checkPermission, documents, selectedUuid, handleSelectDocument } = this.props;
      if (!isEqual(documents, prevProps.documents)) handleSelectDocument(selectedUuid);
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
