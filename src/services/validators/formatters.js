import moment from "moment";

const birthdayFormatter = dateFormat => date => {
  const birthday = moment(date, dateFormat);

  if (!birthday.isValid()) {
    return moment();
  }

  return birthday;
};

export default {
  birthdayFormatter
};
