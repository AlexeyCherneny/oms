import { createCRUDSelectors } from "./utils";

import paymentsSelectors from "./payments";

const salariesSelectors = createCRUDSelectors("salary", "salaries");
const usersSelectors = createCRUDSelectors("user", "users");
const usersPlanSelectors = createCRUDSelectors("usersPlan");

export default {
  ...salariesSelectors,
  ...paymentsSelectors,
  ...usersSelectors,
  ...usersPlanSelectors,
};
