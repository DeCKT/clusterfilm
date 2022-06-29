import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user } = useAuth0();
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}
export default Profile;
