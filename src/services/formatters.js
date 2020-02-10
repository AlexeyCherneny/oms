import moment from "moment";
import { DATE_FORMATS } from "./constants";

export const formatEventsForCalendar = events =>
  events.map(e => ({ ...e, start: new Date(e.date) }));

export const getFullName = user => {
  return user ? `${user.firstName} ${user.lastName}` : '';
};

export const getShortName = user => 
  user ? `${user.firstName[0]}. ${user.lastName}` : '';

export const stringifyDate = date => 
  moment(date).startOf('month').format(DATE_FORMATS.dashReverse);

export const fromProgramToDisplayDate = date => {
  const mDate = moment(date, programDateFormat);

  if (mDate.isValid()) {
    return mDate.format(sDisplayDateFormat);
  }

  return "";
};

export const formatBirthdayForCalendar = arrayOfBirthday => {
  const year = new Date().getFullYear();

  return arrayOfBirthday.map(birthday => {
    const startDate = birthday.date
      .split("/")
      .reverse()
      .slice(1, 3);
    const formattedStartDate = [year, ...startDate].join("-");
    const title = `День рождения: ${birthday.name}`;
    return { ...birthday, start: formattedStartDate, title };
  });
};

export const formatCurrency = (num, curr) => {
  const count = parseFloat(num).toLocaleString("de-De", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  switch (curr) {
    case "USD":
      return `${count} $`;
    case "EUR":
      return `${count} €`;
    case "RUB":
      return `${count} ₽`;
    case "RUR":
      return `${count} ₽`;
    default:
      return String(count) + curr ? ` ${curr}` : '';
  }
};

export const formatCount = (num, one, two = one, five = two) => {
  const count = parseFloat(num);

  const rest10 = count % 10;
  const rest100 = count % 100;
  if (rest10 === 1 && rest100 !== 11) return `${num} ${one}`;
  if (rest10 > 1 && rest10 < 5 && (rest100 < 11 || rest100 > 15))
    return `${num} ${two}`;
  return `${num} ${five}`;
};

export const programDateFormat = "YYYY-MM-DD";
export const displayDateFormat = "DD.MM.YYYY";
export const sDisplayDateFormat = "MM.YYYY";

export const formatPaymentType = type => {
  switch (type) {
    case "income":
      return "Доход";
    case "outcome":
      return "Расход";
    default:
      return type;
  }
};

export const isPermitted = (availableRoles = [], roles = []) =>
  availableRoles.some(availableRole =>
    roles.some(role => availableRole === role)
  );

