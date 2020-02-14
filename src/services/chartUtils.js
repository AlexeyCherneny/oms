import moment from "moment";
const dateFormat = "YYYY-MM-DD";

export const splitRange = (sd, ed, divider, preFill) => {
  try {
    if (!divider) {
      return [];
    }

    if (preFill) {
      if (!sd && !ed) {
        return [];
      }
    }
    let dateFrom = moment()
      .startOf(divider)
      .subtract(6, divider);
    if (sd) {
      dateFrom = moment(sd).startOf(divider);
    }

    let dateTo = moment()
      .startOf(divider)
      .add(6, divider);
    if (ed) {
      dateTo = moment(ed).startOf(divider);
    }

    if (!dateFrom.isValid() || !dateTo.isValid()) {
      return [];
    }

    const splittedItems = {
      [dateTo.format(dateFormat)]: ""
    };

    while (dateTo.subtract(1, divider).isSameOrAfter(dateFrom)) {
      splittedItems[dateTo.format(dateFormat)] = "";
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

    let dateFrom = moment()
      .startOf(divider)
      .subtract(6, divider);
    if (item.dateFrom) {
      dateFrom = moment(item.dateFrom).startOf(divider);
    }

    let dateTo = moment()
      .startOf(divider)
      .add(6, divider);
    if (item.dateTo) {
      dateTo = moment(item.dateTo).startOf(divider);
    }

    if (!dateFrom.isValid() || !dateTo.isValid()) {
      return [];
    }

    const splittedItems = [];

    while (dateTo.subtract(1, divider).isSameOrAfter(dateFrom)) {
      splittedItems.unshift({
        ...item,
        date: dateTo.format(dateFormat)
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
