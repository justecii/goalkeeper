import React from "react";

import UserInfo from "./UserInfo";
import UserGoals from "./UserGoals";
import withAuth from "../withAuth";

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo session={session} />
    <UserGoals username={session.getCurrentUser.username} />
  </div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);
