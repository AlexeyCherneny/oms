export const formatEventsForCalendar = events =>
  events.map(e => ({ ...e, start: new Date(e.date) }));

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
      return `${count} ${curr}`;
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
