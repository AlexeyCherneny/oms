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

    [`get${firstUppercase(name)}ById`]: (state, settings = {}) => id => {
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

        return data.find(item => String(item.id) === String(id));
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    [`is${firstUppercase(name)}Deleting`]: state => id => {
      try {
        const items = get(state, `${path}`);

        if (!items) {
          return false;
        }

        const { deletingIds } = items;

        if (!Array.isArray(deletingIds)) {
          return false;
        }

        return deletingIds.some(
          deletingId => String(deletingId) === String(id)
        );
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    [`is${firstUppercase(name)}Updating`]: state => id => {
      try {
        const items = get(state, `${path}`);

        if (!items) {
          return false;
        }

        const { updatingIds } = items;

        if (!Array.isArray(updatingIds)) {
          return false;
        }

        return updatingIds.some(
          updatingId => String(updatingId) === String(id)
        );
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
