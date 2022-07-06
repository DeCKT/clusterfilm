import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "../Logout";

function Profile() {
  const { user } = useAuth0();
  return (
    <div>
      <h1>{user.name}</h1>
      <Logout />
    </div>
  );
}
export default Profile;
