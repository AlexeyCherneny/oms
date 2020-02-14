import { compose, lifecycle, withStateHandlers, withHandlers, withProps } from "recompose";
import { connect } from "react-redux";

import Settings from "../Components/Settings";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";
import { getFullName } from "../../../services/formatters";

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
    addEditingNode: state => uuid => ({
      ...state,
      editingNodes: [uuid, ...state.editingNodes]
    }),
    deleteEditingNode: state => uuid => ({
      ...state,
      editingNodes: state.editingNodes.filter(el => uuid !== el)
    }),
  }),
  withProps(({ users, accesses, isDocumentUpdating, selectedDocument, isCreating, isDownloading }) => ({
    accessesData: accesses.map(item => ({ 
      data: {...item}, 
      uuid: item.uuid, 
      access: item.access, 
      name: getFullName(users.find(user => user.uuid === item.userUuid)),
    })),
    usersData: users.filter(user => !accesses.find(item => user.uuid === item.userUuid)),
    isDocumentUpdating: isDocumentUpdating(selectedDocument?.uuid),
    isLoading: isCreating || isDownloading || isDocumentUpdating(selectedDocument?.uuid),
  })),
  withHandlers({
    isEditingNode: ({ editingNodes }) => uuid => editingNodes.includes(uuid),
    updateAccess: ({ updateAccess, deleteEditingNode }) => access => {
      updateAccess(access, { onSuccess: () => deleteEditingNode(access.uuid) })
    },
    deleteAccess: ({ deleteAccess }) => access => deleteAccess(access.uuid, { data: access }),
    changePrivateAccess: ({ selectedDocument, updateDocument }) => access => 
      updateDocument({ ...selectedDocument, private: access }),
    submitAddAccess: ({ createAccesses, selectedDocument }) => (data, callback) => {
      const documentUuid = selectedDocument.uuid;
      const preparedData = data.users.map(user => ({ userUuid: user, access: data.access, documentUuid: documentUuid }));
      createAccesses({ data: preparedData, documentUuid }, { onSuccess: callback })
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
