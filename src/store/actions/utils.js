import { createAction } from "redux-act";
import pluralize from "pluralize";

const firstUppercase = s => s.charAt(0).toUpperCase() + s.slice(1);

export const createCRUDActions = name => {
  const upperName = name.toUpperCase();

  const pluralizeName = pluralize(name);
  const pluralizeUpperName = pluralize(name).toUpperCase();

  return {
    [`create${firstUppercase(name)}Request`]: createAction(
      `CREATE_${upperName}_REQUEST`,
      payload => payload,
      (_, meta) => meta
    ),
    [`create${firstUppercase(name)}Success`]: createAction(
      `CREATE_${upperName}_SUCCESS`,
      payload => payload,
      (_, meta) => meta
    ),
    [`create${firstUppercase(name)}Failure`]: createAction(
      `CREATE_${upperName}_FAILURE`,
      payload => payload,
      (_, meta) => meta
    ),

    [`${pluralizeName}Request`]: createAction(
      `${pluralizeUpperName}_REQUEST`,
      payload => payload,
      (_, meta) => meta
    ),
    [`${pluralizeName}Success`]: createAction(
      `${pluralizeUpperName}_SUCCESS`,
      payload => payload,
      (_, meta) => meta
    ),
    [`${pluralizeName}Failure`]: createAction(
      `${pluralizeUpperName}_FAILURE`,
      payload => payload,
      (_, meta) => meta
    ),

    [`update${firstUppercase(name)}Request`]: createAction(
      `UPDATE_${upperName}_REQUEST`,
      payload => payload,
      (_, meta) => meta
    ),
    [`update${firstUppercase(name)}Success`]: createAction(
      `UPDATE_${upperName}_SUCCESS`,
      payload => payload,
      (_, meta) => meta
    ),
    [`update${firstUppercase(name)}Failure`]: createAction(
      `UPDATE_${upperName}_FAILURE`,
      payload => payload,
      (_, meta) => meta
    ),

    [`delete${firstUppercase(name)}Request`]: createAction(
      `DELETE_${upperName}_REQUEST`,
      payload => payload,
      (_, meta) => meta
    ),
    [`delete${firstUppercase(name)}Success`]: createAction(
      `DELETE_${upperName}_SUCCESS`,
      payload => payload,
      (_, meta) => meta
    ),
    [`delete${firstUppercase(name)}Failure`]: createAction(
      `DELETE_${upperName}_FAILURE`,
      payload => payload,
      (_, meta) => meta
    ),

    [`reset${firstUppercase(pluralizeName)}`]: createAction(
      `RESET_${pluralizeUpperName}`,
      payload => payload,
      (_, meta) => meta
    )
  };
};
