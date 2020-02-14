export const isNumber = (_, value, callback) => {
  const numRegExp = /^-?(0|[1-9]\d*)(\.\d*)?$/;
  if (value === '' || numRegExp.test(value)) {
    return callback();
  }
  callback('Необходимо ввести число');
};
