import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const selectUser = ({ authorization }) => authorization?.user;

export default function authorized(ProtectedComponent) {
  const Authenticated = props => {
    const user = useSelector(selectUser);

    return user ? (
      <ProtectedComponent {...props} />
    ) : (
      <Redirect to="/app/sign-in" />
    );
  }

  return Authenticated;
}
