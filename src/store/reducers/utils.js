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

const defaultOnUpdateDataMap = (data, payload) => {
  return updateItemInArray(
    data,
    payload,
    (a, b) => String(a.id) === String(b.id)
  );
};

const defaultOnDeleteDataMap = (data, payload) => {
  return removeItemFromArray(
    data,
    payload,
    (itemA, itemB) => itemA.id !== itemB
  );
};

export const createCRUDReducer = (
  name,
  {
    onCreateDataMap = addItemToArray,
    onUpdateDataMap = defaultOnUpdateDataMap,
    onDeleteDataMap = defaultOnDeleteDataMap
  } = {}
) => {
  const upperName = name.toUpperCase();

  const pluralizeUpperName = pluralize(upperName);

  return {
    // CREATE ENTITY ------------------------------------
    // --------------------------------------------------
    //
    // payload - null
    [`CREATE_${upperName}_REQUEST`]: (state, payload) => {
      return {
        ...state,
        isCreating: true
      };
    },
    //
    // payload - created item
    [`CREATE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onCreateDataMap(state.data, payload),
        isCreating: false
      };
    },
    //
    // payload - null
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
    //
    // payload - null
    [`${pluralizeUpperName}_REQUEST`]: (state, payload) => {
      return {
        ...state,

        isDownloading: true
      };
    },
    //
    // payload - array of read items
    [`${pluralizeUpperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: payload,
        isDownloading: false
      };
    },
    //
    // payload - null
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
    //
    // payload - updated item
    [`UPDATE_${upperName}_REQUEST`]: (state, payload) => {
      return {
        ...state,

        updatingIds: addItemToArray(state.updatingIds, payload.id)
      };
    },
    //
    // payload - updated item
    [`UPDATE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onUpdateDataMap(state.data, payload),
        updatingIds: removeItemFromArray(state.updatingIds, payload.id)
      };
    },
    //
    // payload - id of updating item
    [`UPDATE_${upperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        updatingIds: removeItemFromArray(state.updatingIds, payload)
      };
    },
    // --
    // --
    // --
    // --
    // DELETE ENTITY ------------------------------------
    // --------------------------------------------------
    //
    // payload - id of deleting item
    [`DELETE_${upperName}_REQUEST`]: (state, payload) => {
      return {
        ...state,

        deletingIds: addItemToArray(state.deletingIds, payload)
      };
    },
    //
    // payload - id of deleting item
    [`DELETE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onDeleteDataMap(state.data, payload),
        deletingIds: removeItemFromArray(state.deletingIds, payload)
      };
    },
    //
    // payload - id of deleting item
    [`DELETE_${upperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        deletingIds: removeItemFromArray(state.deletingIds, payload)
      };
    },
    // --
    // --
    // --
    // --
    // --------------------------------------------------
    // --------------------------------------------------
    //
    // payload - id of deleting item
    [`RESET_${pluralizeUpperName}`]: (state, payload) => {
      return {
        ...state,

        data: []
      };
    }
  };
};

export const CRUDReducer = (name, settings) =>
  createReducer(createCRUDReducer(name, settings), CRUDState);
