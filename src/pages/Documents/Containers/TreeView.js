import { compose, withProps, withHandlers } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { tree } from "../../../helpers";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import TreeView from "../Components/TreeView";

const mapState = state => ({
  documents: selectors.getDocuments(state)
});

const mapDispatch = {
  readDocuments: actions.documentsRequest
};

const TreeViewContainer = compose(
  withRouter,
  connect(mapState, mapDispatch),
  withProps(({ documents }) => {
    return {
      tree: tree.getTreeFormArr(documents)
    };
  }),
  withHandlers({
    handleSelectNode: ({ history }) => documentId => {
      history.push(`/app/cabinet/documents/${documentId}`);
    },
    handleCreateNode: () => () => {},
    handleDeleteNode: () => () => {}
  })
)(TreeView);

export default TreeViewContainer;
