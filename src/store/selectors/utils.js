import { get } from "lodash";
import pluralize from "pluralize";

const firstUppercase = s => s.charAt(0).toUpperCase() + s.slice(1);

export const createCRUDSelectors = (name, path = name, settings = {}) => {
  const pluralizedName = pluralize(name);

  return {
    [`get${firstUppercase(pluralizedName)}`]: (state, settings = {}) => {
      try {
        const items = get(state, `${path}`);

        if (!items) {
          return [];
        }

        const { data, isDownloading } = items;

        if (settings.trackFlags && isDownloading) return [];

        if (!Array.isArray(data)) {
          return [];
        }

        return data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },

    [`get${firstUppercase(name)}ByUuid`]: state => uuid => {
      const { idKey = 'uuid' } = settings;
      try {
        const items = get(state, `${path}`);

        if (!items) {
          return null;
        }

        const { data, isDownloading } = items;

        if (settings.trackFlags && isDownloading) return null;

        if (!Array.isArray(data)) {
          return null;
        }

        return data.find(
          item =>
            String(item[idKey]) === String(uuid) || String(item.uuid) === String(uuid)
        );
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    [`is${firstUppercase(name)}Deleting`]: state => uuid => {
      try {
        const items = get(state, `${path}`);

        if (!items) {
          return false;
        }

        const { deletingUuids } = items;

        if (!Array.isArray(deletingUuids)) {
          return false;
        }

        return deletingUuids.some(
          deletingUuid => String(deletingUuid) === String(uuid)
        );
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    [`is${firstUppercase(name)}Updating`]: state => uuid => {
      try {
        const items = get(state, `${path}`);

        if (!items) {
          return false;
        }

        const { updatingUuids } = items;

        if (!Array.isArray(updatingUuids)) {
          return false;
        }

        return updatingUuids.some(
          updatingUuid => String(updatingUuid) === String(uuid)
        );
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    [`is${firstUppercase(name)}Creating`]: state => {
      try {
        const items = get(state, `${path}`);
        return items?.isCreating || false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    [`is${firstUppercase(pluralizedName)}Downloading`]: state => {
      try {
        const items = get(state, `${path}`);

        if (!items) {
          return false;
        }

        return items.isDownloading;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  };
};
