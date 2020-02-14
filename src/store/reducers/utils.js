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
  if (!item && item !== 0) return arr;

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
  updatingUuids: [],
  deletingUuids: []
};

const defaultOnUpdateDataMap = (data, payload) => {
  return updateItemInArray(
    data,
    payload,
    (a, b) =>
      String(a.uuid) === String(b.uuid) || String(a.uuid) === String(b.uuid)
  );
};

const defaultOnDeleteDataMap = (data, payload) => {
  return removeItemFromArray(
    data,
    payload,
    (itemA, itemB) => itemA.uuid !== itemB
  );
};

export const createCRUDReducer = (
  name,
  {
    onCreateDataMap = addItemToArray,
    onUpdateDataMap = defaultOnUpdateDataMap,
    onDeleteDataMap = defaultOnDeleteDataMap
  } = {},
  customReducers
) => {
  const upperName = name.toUpperCase();

  const pluralizeUpperName = pluralize(upperName);

  return {
    ...customReducers,
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

        updatingUuids: addItemToArray(state.updatingUuids, payload.uuid)
      };
    },
    //
    // payload - updated item
    [`UPDATE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onUpdateDataMap(state.data, payload),
        updatingUuids: removeItemFromArray(state.updatingUuids, payload.uuid)
      };
    },
    //
    // payload - uuid of updating item
    [`UPDATE_${upperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        updatingUuids: removeItemFromArray(state.updatingUuids, payload)
      };
    },
    // --
    // --
    // --
    // --
    // DELETE ENTITY ------------------------------------
    // --------------------------------------------------
    //
    // payload - uuid of deleting item
    [`DELETE_${upperName}_REQUEST`]: (state, payload) => {
      return {
        ...state,

        deletingUuids: addItemToArray(state.deletingUuids, payload)
      };
    },
    //
    // payload - uuid of deleting item
    [`DELETE_${upperName}_SUCCESS`]: (state, payload) => {
      return {
        ...state,

        data: onDeleteDataMap(state.data, payload),
        deletingUuids: removeItemFromArray(state.deletingUuids, payload)
      };
    },
    //
    // payload - uuid of deleting item
    [`DELETE_${upperName}_FAILURE`]: (state, payload) => {
      return {
        ...state,

        deletingUuids: removeItemFromArray(state.deletingUuids, payload)
      };
    },
    // --
    // --
    // --
    // --
    // --------------------------------------------------
    // --------------------------------------------------
    //
    // payload - uuid of deleting item
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
