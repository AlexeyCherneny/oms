import { compose, withProps, withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEqual } from 'lodash';

import { tree } from "../../../services/helpers";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import TreeView from "../Components/TreeView";
import { BASE_URL } from "../constants";

const mapState = state => ({
  documents: selectors.getDocuments(state),
  isLoading: selectors.isDocumentsDownloading(state),
});

const mapDispatch = {
  setDocument: actions.setCurrentDocument,
  readDocuments: actions.documentsRequest,
};

const TreeViewContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
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
    handleSetDocument: ({ documents, setDocument }) => id => {
      const isDocument = id && !documents.find(doc => String(doc.parent_document) === id);
      const document = (isDocument && documents.find(doc => String(doc.id) === id)) || null;
      setDocument(document);
    },
    handleSelectNode: ({ history }) => documentIds => {
      const id = documentIds[0] || '';
      history.push(BASE_URL + (id && `/${id}`));
    },
    handleCreate: ({ openNameModal }) => data => openNameModal(data, true),
    handleRename: ({ openNameModal }) => data => openNameModal(data),
    handleDelete: ({ openDeleteModal, selectedId }) => data => openDeleteModal(data, selectedId),
  }),
  lifecycle({
    componentDidMount() {
      const { selectedId, handleSetDocument } = this.props;
      handleSetDocument(selectedId);
    },
    componentDidUpdate(prevProps) {
      const { selectedId, documents, handleSetDocument } = this.props;
      if (selectedId !== prevProps.selectedId || !isEqual(documents, prevProps.documents)) {
        handleSetDocument(selectedId);
      }
    },
  })
)(TreeView);

export default TreeViewContainer;
