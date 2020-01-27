export const BASE_URL = "/app/cabinet/documents";

export const DOCUMENT_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest',
};

export const DOCUMENT_ROLES_DESCRIPTION = {
  [DOCUMENT_ROLES.ADMIN]: {
    name: 'Админ',
    color: 'volcano'
  },
  [DOCUMENT_ROLES.MEMBER]: {
    name: 'Редактор',
    color: 'geekblue',
  },
  [DOCUMENT_ROLES.GUEST]: {
    name: 'Гость',
    color: 'green',
  },
};

export const PERMISSIONS = [DOCUMENT_ROLES.ADMIN, DOCUMENT_ROLES.MEMBER, DOCUMENT_ROLES.GUEST];
export const ALLOW_EDIT_DOCUMENT = [DOCUMENT_ROLES.ADMIN, DOCUMENT_ROLES.MEMBER];
export const ALLOW_EDIT_ACCESS = [DOCUMENT_ROLES.ADMIN];

export const MODALS = {
  RENAME: 'rename_document',
  DELETE: 'delete_document',
  SAVE: 'save_document',
}
