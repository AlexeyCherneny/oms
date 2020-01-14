import moment from "moment";
const dateFormat = "YYYY-MM-DD";

export const splitRage = (sd, ed, divider) => {
  try {
    if (!divider) {
      return [];
    }

    let startDate = moment()
      .startOf(divider)
      .subtract(6, divider);
    if (sd) {
      startDate = moment(sd).startOf(divider);
    }

    let endDate = moment()
      .startOf(divider)
      .add(6, divider);
    if (ed) {
      endDate = moment(ed).startOf(divider);
    }

    if (!startDate.isValid() || !endDate.isValid()) {
      return [];
    }

    const splittedItems = {};

    while (endDate.subtract(1, divider).isSameOrAfter(startDate)) {
      splittedItems[endDate.format(dateFormat)] = "";
    }

    return splittedItems;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const splitTimelineItem = (item, divider = "months") => {
  try {
    if (!divider) {
      return [];
    }

    let startDate = moment()
      .startOf(divider)
      .subtract(6, divider);
    if (item.startDate) {
      startDate = moment(item.startDate).startOf(divider);
    }

    let endDate = moment()
      .startOf(divider)
      .add(6, divider);
    if (item.endDate) {
      endDate = moment(item.endDate).startOf(divider);
    }

    if (!startDate.isValid() || !endDate.isValid()) {
      return [];
    }

    const splittedItems = [];

    while (endDate.subtract(1, divider).isSameOrAfter(startDate)) {
      splittedItems.unshift({
        ...item,
        date: endDate.format(dateFormat)
      });
    }

    return splittedItems;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const splitTimelineItems = (timelineItems, divider) => {
  try {
    const splittedItems = [];

    timelineItems.forEach(item => {
      const splittedItem = splitTimelineItem(item, divider);

      splittedItem.forEach(subitem => splittedItems.push(subitem));
    });

    return splittedItems;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const matchEntities = (
  entityA,
  entityB,
  isMatch = () => true,
  match = () => {}
) => {
  try {
    const matches = [];

    entityA.forEach(entityAItem => {
      entityB.forEach(entityBItem => {
        if (isMatch(entityAItem, entityBItem)) {
          matches.push(match(entityAItem, entityBItem));
        }
      });
    });

    return matches;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const mergeObjects = (arr, merger) => {
  const data = {};

  arr.forEach(item => {
    if (data[item.date]) {
      data[item.date] = { ...data[item.date], ...item };
    } else {
      data[item.date] = { ...item };
    }
  });

  return Object.values(data);
};
