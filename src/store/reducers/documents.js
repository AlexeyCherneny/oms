import { createReducer } from "redux-act";

import { tree } from '../../helpers';
import actions from "../actions";

const initialState = {
  documentsList: {
    data: [],
    isLoading: true,
    listAsTree: [],
  },
};

const reducer = createReducer(
  {
    [actions.documentsListSuccess]: (state, { documents }) => {
      return {
        ...state,
        documentsList: {
          data: documents,
          isLoading: false,
          listAsTree: tree.getTreeFormArr(documents),
        }
      };
    },
    [actions.documentsListFailure]: state => {
      return {
        ...state,
        documentsList: {
          data: [],
          isLoading: false,
          listAsTree: [],
        }
      };
    },

    [actions.updateListSuccess]: (state, { document }) => {
      const newData = [...state.documentsList.data.filter(el => el.id !== document.id), document]
      return {
        ...state,
        documentsList: {
          data: newData,
          isLoading: false,
          listAsTree: tree.getTreeFormArr(newData),
        }
      };
    },
    [actions.updateListFailure]: (state) => {
      return {
        ...state,
        documentsList: {
          data: state.documentsList.data,
          isLoading: false,
          listAsTree: tree.getTreeFormArr(state.documentsList.data),
        }
      };
    },
  },
  initialState
);

export default reducer;
