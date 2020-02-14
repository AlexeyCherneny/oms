import React from "react";
import { Icon } from "antd";

import { DATE_FORMATS } from "../../../services/constants";
import {
  validators,
  normalizers,
  formatters
} from "../../../services/validators/index";

export default {
  photo: {
    name: "photo"
  },

  roles: {
    label: "Роль",
    name: "roles",
    inputProps: {
      mode: "multiple",
      placeholder: "Роль",
      suffixIcon: (
        <Icon type="crown" style={{ color: "rgba(0,0,0,.25)", fontSize: 14 }} />
      ),
      showArrow: true
    },
    validate: [validators.validateRequired],
    format: formatters.arrayFormatter
  },

  email: {
    label: "Email",
    name: "email",
    inputProps: {
      placeholder: "a.cherneny@gmail.com",
      suffix: <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
    },
    validate: [validators.validateRequired, validators.validateEmailFormat]
  },

  phone: {
    label: "Номер телефона",
    name: "phone",
    inputProps: {
      placeholder: "+375 29 687-81-12",
      suffix: <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />,
      mask: "+375 99 999-99-99",
      maskChar: ""
    },
    normalize: normalizers.normalizePhone,
    validate: [validators.validateRequired, validators.validatePhoneFormat]
  },

  lastName: {
    label: "Фамилия",
    name: "lastName",
    inputProps: {
      placeholder: "Черненый",
      suffix: <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
    },
    validate: [validators.validateRequired]
  },

  firstName: {
    label: "Имя",
    name: "firstName",
    inputProps: {
      placeholder: "Алексей",
      suffix: <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
    },
    validate: [validators.validateRequired]
  },

  middleName: {
    label: "Отчество",
    name: "middleName",
    inputProps: {
      placeholder: "Андреевич",
      suffix: <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
    }
  },

  birthday: {
    label: "День рождения",
    name: "birthday",
    inputProps: {
      placeholder: "01.04.1997",
      format: [DATE_FORMATS.pointFull],
      suffix: <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />,
      style: { width: "100%" }
    },
    validate: [validators.validateRequired],
    format: formatters.dateFormatter(DATE_FORMATS.dashReverse),
    normalize: normalizers.momentDateNormalizer(DATE_FORMATS.dashReverse)
  }
};
