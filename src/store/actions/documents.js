import { createCRUDActions } from './utils';
import { createAction } from 'redux-act';

const documentActions = createCRUDActions("document");
const setCurrentDocument = createAction("SET_CURRENT_DOCUMENT");
const editCurrentDocument = createAction("EDIT_CURRENT_DOCUMENT");

export default {
  ...documentActions,
  setCurrentDocument,
  editCurrentDocument,
}
