import pluralize from "pluralize";
import { createReducer } from "redux-act";

export const requestHandler = location => state => ({
  ...state,

  [location]: {
    ...state[location],

    isLoading: true
  }
});

export const successHandler = location => (state, payload) => ({
  ...state,

  [location]: {
    ...state[location],

    data: payload,

    isLoading: false,
    isLoaded: true,
    isError: false
  }
});

export const failureHandler = location => state => ({
  ...state,

  [location]: {
    ...state[location],

    isLoading: false,
    isError: true
  }
});

export const setFalseHandler = (location, name) => state => ({
  ...state,

  [location]: {
    ...state[location],
    [name]: false
  }
});

export const setTrueHandler = (location, name) => state => ({
  ...state,

  [location]: {
    ...state[location],
    [name]: true
  }
});

export const onChangeHandler = location => (state, payload) => ({
  ...state,

  [location]: {
    ...state[location],
    ...payload
  }
});

const addItemToArray = (arr, item) => {
  if (!item) return arr;

  const isItemInArray = arr.some(a => a === item);

  if (!isItemInArray) {
    return [...arr, item];
  }

  return arr;
};

const updateItemInArray = (
  arr,
  uItem,
  match = (itemA, itemB) => String(itemA) !== String(itemB)
) => {
  return arr.map(item => (match(item, uItem) ? uItem : item));
};

const removeItemFromArray = (
  arr,
  item,
  match = (itemA, itemB) => itemA !== itemB
) => arr.filter(a => match(a, item));

export const CRUDState = {
  data: [],
  isDownloading: false,
  isCreating: false,
  updatingIds: [],
  deletingIds: []
};

export const createCRUDReducer = (
  name,
  {
    onCreateDataMap = addItemToArray,
    onUpdateDataMap = (data, payload) =>
      updateItemInArray(
        data,
        payload.item,
        (a, b) => String(a.uuid) === String(b.uuid)
      ),
    onDeleteDataMap = (data, payload) =>
      removeItemFromArray(data, payload, (itemA, itemB) => itemA.uuid !== itemB)
  } = {}
) => {
  const upperName = name.toUpperCase();

  const pluralizeUpperName = pluralize(upperName);

  return {
    // CREATE ENTITY ------------------------------------
    // --------------------------------------------------
    [`CREATE_${upperName}_REQUEST`]: state => {
      return {
        ...state,
        isCreating: true
      };
    },
    [`CREATE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onCreateDataMap(state.data, payload),
        isCreating: false
      };
    },
    [`CREATE_${upperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        isCreating: false
      };
    },
    // --------------------------------------------------
    // --------------------------------------------------
    // --
    // --
    // --
    // --
    // READ ENTITY --------------------------------------
    // --------------------------------------------------
    [`${pluralizeUpperName}_REQUEST`]: state => {
      return {
        ...state,

        isDownloading: true
      };
    },
    [`${pluralizeUpperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: payload,
        isDownloading: false
      };
    },
    [`${pluralizeUpperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        data: [],
        isDownloading: false
      };
    },
    // --------------------------------------------------
    // --------------------------------------------------
    // --
    // --
    // --
    // --
    // UPDATE ENTITY ------------------------------------
    // --------------------------------------------------
    [`UPDATE_${upperName}_REQUEST`]: (state, payload) => {
      return {
        ...state,

        updatingIds: addItemToArray(state.updatingIds, payload.id)
      };
    },
    [`UPDATE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onUpdateDataMap(state.data, payload),
        updatingIds: removeItemFromArray(state.updatingIds, payload.id)
      };
    },
    [`UPDATE_${upperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        updatingIds: removeItemFromArray(state.updatingIds, payload.id)
      };
    },
    // --
    // --
    // --
    // --
    // DELETE ENTITY ------------------------------------
    // --------------------------------------------------
    [`DELETE_${upperName}_REQUEST`]: (state, payload) => {
      return {
        ...state,

        deletingIds: addItemToArray(state.deletingIds, payload)
      };
    },
    [`DELETE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onDeleteDataMap(state.data, payload),
        deletingIds: removeItemFromArray(state.deletingIds, payload)
      };
    },
    [`DELETE_${upperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        deletingIds: removeItemFromArray(state.deletingIds, payload)
      };
    }
  };
};

export const CRUDReducer = (name, settings) =>
  createReducer(createCRUDReducer(name, settings), CRUDState);
