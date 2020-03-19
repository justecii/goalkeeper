import React from "react";

import UserInfo from "./UserInfo";
import UserAssets from "./UserAssets";
import withAuth from "../withAuth";

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo session={session} />
    <UserAssets user={session.getCurrentUser._id} />
  </div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);
