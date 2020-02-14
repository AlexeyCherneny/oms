import React from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";

import SalariesManagement from "../pages/Salaries/Containers/SalariesManagement";
import SalaryRangeTable from "../pages/Salaries/Containers/SalaryRangeTable";
import SalaryAnalytics from "../pages/Salaries/Containers/SalaryAnalytics";

import { Header, Modal } from "../Components";
import {
  Users,
  UsersPlan,
  Events,
  Profile,
  Salaries,
  CreateUser,
  UserInfo,
  EditUser,
  Payments,
  Home,
  UpdatePayment,
  CreatePayment,
  PaymentInfo,
  Documents,
  Projects
} from "../pages";

const { Content } = Layout;

const Cabinet = () => (
  <Layout>
    <Modal />
    <Header />

    <Content style={{ padding: "50px 30px", height: "100vh" }}>
      <Switch>
        <Route path="/app/cabinet" exact component={Home} />
        <Route path="/app/cabinet/profile" component={Profile} />
        <Route path="/app/cabinet/events">
          <Switch>
            <Route exact path="/app/cabinet/events" component={Events} />
            <Route
              path="/app/cabinet/events/:operation(new)"
              component={Events}
            />
            <Route
              path="/app/cabinet/events/:operation(edit)/:uuid"
              component={Events}
            />
            <Redirect to="/app/cabinet/events" />
          </Switch>
        </Route>

        <Route path="/app/cabinet/users">
          <Switch>
            <Route path="/app/cabinet/users/plan" exact component={UsersPlan} />
            <Route
              path="/app/cabinet/users/plan/:operation(new)"
              component={UsersPlan}
            />
            <Route
              path="/app/cabinet/users/plan/:operation(edit)/:uuid"
              component={UsersPlan}
            />
            <Route path="/app/cabinet/users">
              <Users />
              <Route path="/app/cabinet/users/create" component={CreateUser} />
              <Route path="/app/cabinet/users/:uuid/info" component={UserInfo} />
              <Route path="/app/cabinet/users/:uuid/edit" component={EditUser} />
            </Route>
          </Switch>
        </Route>

        <Route path="/app/cabinet/projects" component={Projects} />

        <Route path="/app/cabinet/salaries">
          <Salaries>
            <Switch>
              <Route
                exact
                path="/app/cabinet/salaries/analytics"
                component={SalaryAnalytics}
              />

              <Route exact path="/app/cabinet/salaries/:userUuid?">
                <SalariesManagement>
                  <Route
                    path="/app/cabinet/salaries/:userUuid"
                    component={SalaryRangeTable}
                  />
                </SalariesManagement>
              </Route>
            </Switch>
          </Salaries>
        </Route>

        <Route path="/app/cabinet/payments">
          <Payments />

          <Route
            path="/app/cabinet/payments/create"
            component={CreatePayment}
          />
          <Route
            path="/app/cabinet/payments/:uuid/edit"
            component={UpdatePayment}
          />
          <Route
            path="/app/cabinet/payments/:uuid/info"
            component={PaymentInfo}
          />
        </Route>

        <Route path="/app/cabinet/documents">
          {/* <Documents /> */}
          <Route path="/app/cabinet/documents" component={Documents} />
        </Route>

        <Redirect to="/app/cabinet" />
      </Switch>
    </Content>
  </Layout>
);

export default Cabinet;
