import { createCRUDActions } from "./utils";

import authorizationActions from "./authorization";
import applicationActions from "./application";
import eventsActions from "./events";
import paymentsActions from "./payments";
import documentActions from "./documents";
import modalActions from "./modal";
import salariesActions from "./salaries";

const usersActions = createCRUDActions("user");
const usersPlanActions = createCRUDActions("usersPlan");
const projectsActions = createCRUDActions("project");
const projectWorkActions = createCRUDActions("projectWork");
const documentAccessActions = createCRUDActions("documentAccess");

export default {
  ...applicationActions,
  ...authorizationActions,
  ...usersActions,
  ...eventsActions,
  ...salariesActions,
  ...paymentsActions,
  ...usersPlanActions,
  ...documentActions,
  ...projectsActions,
  ...modalActions,
  ...projectWorkActions,
  ...documentAccessActions,
};
