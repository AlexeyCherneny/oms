import SalaryRange from "./Containers/index";
import { ROLES } from "../../../services/constants";

const rangeSalaryFields = ["dateFrom", "dateTo", "value", "userUuid"];

export const getAvailableFieldsNames = roles => {
  const isEmployee = roles.includes(!ROLES.HR);
  let fields = [...rangeSalaryFields];

  if (isEmployee) {
    fields = fields.filter(inpName => ![].includes(inpName));
  }

  return fields;
};

export default SalaryRange;
