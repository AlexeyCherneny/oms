import React from "react";
import { Icon } from "antd";

import { DATE_FORMATS } from "../../../services/constants";
import {
  validators,
  normalizers,
  formatters
} from "../../../services/validators/index";

export default {
  userUuid: {
    label: "Пользователь",
    name: "userUuid",
    inputProps: {
      placeholder: "Алексей Черненый",
      suffixIcon: (
        <Icon type="user" style={{ color: "rgba(0,0,0,.25)", fontSize: 14 }} />
      ),
      showArrow: true
    },
    validate: [validators.validateRequired]
  },

  value: {
    label: "Сумма",
    name: "value",
    inputProps: {
      placeholder: "Алексей Черненый",
      suffix: (
        <Icon type="user" style={{ color: "rgba(0,0,0,.25)", fontSize: 14 }} />
      )
    },
    validate: [validators.validateRequired]
  },

  dateFrom: {
    label: "С",
    name: "dateFrom",
    inputProps: {
      placeholder: "01.04.1997",
      format: [DATE_FORMATS.pointMonthYear],
      suffix: <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />,
      style: { width: "100%" }
    },
    validate: [validators.validateRequired],
    format: formatters.birthdayFormatter(DATE_FORMATS.dashReverse),
    normalize: normalizers.momentDateNormalizer(DATE_FORMATS.dashReverse)
  },

  dateTo: {
    label: "По",
    name: "dateTo",
    inputProps: {
      placeholder: "01.04.1997",
      format: [DATE_FORMATS.pointMonthYear],
      suffix: <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />,
      style: { width: "100%" }
    },
    validate: [validators.validateRequired],
    format: formatters.birthdayFormatter(DATE_FORMATS.dashReverse),
    normalize: normalizers.momentDateNormalizer(DATE_FORMATS.dashReverse)
  }
};
