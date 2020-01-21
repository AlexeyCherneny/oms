import React from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";

import { Header } from "../Components";
import {
  Users,
  UsersPlan,
  Events,
  Profile,
  Salaries,
  CreateSalary,
  EditSalary,
  CreateUser,
  UserInfo,
  EditUser,
  Payments,
  Home,
  UpdatePayment,
  CreatePayment,
  PaymentInfo,
  Documents,
} from "../pages";

const { Content } = Layout;

const Cabinet = () => (
  <Layout>
    <Header />

    <Content style={{ padding: "50px 30px", minHeight: "100vh" }}>
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
              path="/app/cabinet/events/:operation(edit)/:id"
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
              path="/app/cabinet/users/plan/:operation(edit)/:id"
              component={UsersPlan}
            />
            <Route path="/app/cabinet/users/">
              <Users />
              <Route path="/app/cabinet/users/create" component={CreateUser} />
              <Route path="/app/cabinet/users/:id/info" component={UserInfo} />
              <Route
                path="/app/cabinet/users/:id/edit"
                component={EditUser}
              />
            </Route>
          </Switch>
        </Route>

        <Route path="/app/cabinet/salaries">
          <Salaries />

          <Route path="/app/cabinet/salaries/create" component={CreateSalary} />
          <Route path="/app/cabinet/salaries/:id/edit" component={EditSalary} />
        </Route>

        <Route path="/app/cabinet/payments">
          <Payments />

          <Route
            path="/app/cabinet/payments/create"
            component={CreatePayment}
          />
          <Route
            path="/app/cabinet/payments/:id/edit"
            component={UpdatePayment}
          />
          <Route
            path="/app/cabinet/payments/:id/info"
            component={PaymentInfo}
          />
        </Route>

        <Route path="/app/cabinet/documents">
          <Documents />
          {/* <Route path="/app/cabinet/documents" component={Documents} /> */}
        </Route>

        <Redirect to="/app/cabinet/" />
      </Switch>
    </Content>
  </Layout>
);

export default Cabinet;
