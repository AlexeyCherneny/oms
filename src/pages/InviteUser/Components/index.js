import React from "react";

import InviteUserForm from "../../../Components/Forms/InviteUser";

const InviteUser = props => (
  <InviteUserForm
    isLoading={props.isLoading}
    handleSubmit={props.invitePerson}
  />
);

export default InviteUser;
