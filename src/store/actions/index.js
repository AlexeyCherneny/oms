import { createCRUDActions } from "./utils";

import authorizationActions from "./authorization";
import applicationActions from "./application";
import eventsActions from "./events";
import paymentsActions from "./payments";
import documentActions from "./documents";

const usersActions = createCRUDActions("user");
const salariesActions = createCRUDActions("salary");
const usersPlanActions = createCRUDActions("usersPlan");

export default {
  ...applicationActions,
  ...authorizationActions,
  ...usersActions,
  ...eventsActions,
  ...salariesActions,
  ...paymentsActions,
  ...usersPlanActions,
  ...documentActions
};
