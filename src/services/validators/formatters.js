import moment from "moment";

const dateFormatter = dateFormat => value => {
  const date = moment(value, dateFormat);

  if (!date.isValid()) {
    return null;
  }

  return date;
};

const arrayFormatter = value => (Array.isArray(value) ? value : []);

export default {
  dateFormatter,
  arrayFormatter
};
