import { createCRUDSelectors } from "./utils";

import paymentsSelectors from "./payments";

const salariesSelectors = createCRUDSelectors("salary", "salaries");
const usersSelectors = createCRUDSelectors("user", "users");
const usersPlanSelectors = createCRUDSelectors("usersPlan");
const documentSelectors = createCRUDSelectors("document", "documents");
const projectSelectors = createCRUDSelectors("project", "projects");
const projectWorksSelectors = createCRUDSelectors(
  "projectWork",
  "projectWorks"
);
const documentAccessSelectors = createCRUDSelectors("documentAccess", "documentAccesses");

export default {
  ...salariesSelectors,
  ...paymentsSelectors,
  ...usersSelectors,
  ...usersPlanSelectors,
  ...projectSelectors,
  ...documentSelectors,
  ...projectWorksSelectors,
  ...documentAccessSelectors,
};
