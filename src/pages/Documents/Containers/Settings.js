import { compose, lifecycle, withStateHandlers, withHandlers, withProps } from "recompose";
import { connect } from "react-redux";

import Settings from "../Components/Settings";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { getFullUserName } from "../../../services/formatters";

const mapState = state => ({
  users: selectors.getUsers(state),
  isDocumentUpdating: selectors.isDocumentUpdating(state),
  accesses: selectors.getDocumentAccesses(state),
  isDownloading: selectors.isDocumentAccessesDownloading(state),
  isCreating: selectors.isDocumentAccessCreating(state),
  getIsUpdating: selectors.isDocumentAccessUpdating(state),
  getIsDeleting: selectors.isDocumentAccessDeleting(state),
});

const mapDispatch = {
  loadUsers: actions.usersRequest,
  updateDocument: actions.updateDocumentRequest,
  createAccesses: actions.createDocumentAccessRequest,
  updateAccess: actions.updateDocumentAccessRequest,
  deleteAccess: actions.deleteDocumentAccessRequest,
};

const SettingsContainer = compose(
  connect(mapState, mapDispatch),
  withStateHandlers({ 
    editingNodes: [] 
  }, {
    addEditingNode: state => id => ({
      ...state,
      editingNodes: [id, ...state.editingNodes]
    }),
    deleteEditingNode: state => id => ({
      ...state,
      editingNodes: state.editingNodes.filter(el => id !== el)
    }),
  }),
  withProps(({ users, accesses, isDocumentUpdating, selectedDocument, isCreating, isDownloading }) => ({
    accessesData: accesses.map(item => ({ 
      data: {...item}, 
      id: item.id, 
      access: item.access, 
      name: getFullUserName(users.find(user => user.uuid === item.user_id)),
    })),
    usersData: users.filter(user => !accesses.find(item => user.uuid === item.user_id)),
    isDocumentUpdating: isDocumentUpdating(selectedDocument?.id),
    isLoading: isCreating || isDownloading || isDocumentUpdating(selectedDocument?.id),
  })),
  withHandlers({
    isEditingNode: ({ editingNodes }) => id => editingNodes.includes(id),
    updateAccess: ({ updateAccess, deleteEditingNode }) => access => {
      updateAccess(access, { onSuccess: () => deleteEditingNode(access.id) })
    },
    deleteAccess: ({ deleteAccess }) => access => deleteAccess(access.id, { data: access }),
    changePrivateAccess: ({ selectedDocument, updateDocument }) => access => 
      updateDocument({ ...selectedDocument, private: access }),
    submitAddAccess: ({ createAccesses, selectedDocument }) => (data, callback) => {
      const documentId = selectedDocument.id;
      const preparedData = data.users.map(user => ({ user_id: user, access: data.access, document_id: documentId }));
      createAccesses({ data: preparedData, documentId }, { onSuccess: callback })
    }
  }),
  lifecycle({
    componentDidMount() {
      const { users, loadUsers } = this.props;
      if (users.length === 0) loadUsers();
    }
  })
)(Settings);

export default SettingsContainer;
