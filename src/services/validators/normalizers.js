import moment from "moment";

const normalizePhone = value => {
  if (!value) return "";

  return value.replace(/\D/g, "");
};

const momentDateNormalizer = dateFormat => value => {
  const birthday = moment(value);

  if (!birthday.isValid()) {
    return moment().format(dateFormat);
  }

  return moment(value).format(dateFormat);
};

export default {
  normalizePhone,
  momentDateNormalizer
};
