export const buildValidator = (patterns, errMsg) => value => {
  if (!value) return false;

  if (Array.isArray(patterns)) {
    const isValid = patterns.some(pattern => pattern.test(value));
    return isValid ? false : errMsg;
  }
  return value && patterns.test(value) ? false : errMsg;
};

export const buildRules = validators => {
  return [
    {
      validator: (rule, value, callback) => {
        try {
          if (Array.isArray(validators)) {
            const errValidator = validators.find(validator => validator(value));

            if (errValidator) {
              return callback(errValidator(value));
            }
            return callback();
          }
          return callback(validators(value));
        } catch (error) {
          console.log("error: ", error);
        }
      }
    }
  ];
};
