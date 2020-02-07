import { createCRUDActions } from './utils';
import { createAction } from 'redux-act';

const documentActions = createCRUDActions("document");
const selectDocument = createAction("SET_SELECTED_DOCUMENT");
const editSelectedDocument = createAction("EDIT_SELECTED_DOCUMENT");
const resetEditDocument = createAction("RESET_EDIT_DOCUMENT");

export default {
  ...documentActions,
  selectDocument,
  editSelectedDocument,
  resetEditDocument,
}
