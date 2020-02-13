import { isEmpty } from "lodash";

import patterns from "./patterns";
import { buildValidator } from "./utils";

import errors from "./errors";

// ======================================================================================================================
// Required
const validateRequired = value => (isEmpty(value) ? errors.required : false);

// ======================================================================================================================
// Email
const validateEmailFormat = buildValidator(patterns.email, errors.emailFormat);

// ======================================================================================================================
// Phone
const validatePhoneFormat = buildValidator(patterns.phone, errors.phoneFormat);

export default { validateRequired, validateEmailFormat, validatePhoneFormat };
