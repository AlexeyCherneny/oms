import { createReducer } from "redux-act";

import actions from "../actions";

const initialState = {
  isOpen: false,
  form: {
    initialValues: null
  },
  title: "",
  content: "",
  type: "",
  cancelText: "",
  okText: "",
  isLoading: false
};

const reducer = createReducer(
  {
    [actions.openModal]: (state, payload) => ({
      ...state,
      form: payload.form,
      type: payload.type,
      title: payload.title,
      content: payload.content,
      okText: payload.okText,
      cancelText: payload.cancelText,
      isOpen: true
    }),
    [actions.hideModal]: (state, payload) => ({
      ...state,
      form: null,
      type: "",
      isOpen: false
    }),

    [actions.startModalLoading]: (state, payload) => ({
      ...state,
      isLoading: true
    }),
    [actions.stopModalLoading]: (state, payload) => ({
      ...state,
      isLoading: false
    })
  },
  initialState
);

export default reducer;
