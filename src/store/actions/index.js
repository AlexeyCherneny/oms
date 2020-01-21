import { createCRUDActions } from "./utils";

import authorizationActions from "./authorization";
import applicationActions from "./application";
import eventsActions from "./events";
import paymentsActions from "./payments";

const usersActions = createCRUDActions("user");
const salariesActions = createCRUDActions("salary");
const usersPlanActions = createCRUDActions("usersPlan");
const documentActions = createCRUDActions("document");

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
