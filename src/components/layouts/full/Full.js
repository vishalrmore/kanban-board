import React, { useEffect, useState } from "react";
import Tasks from "../../features/tasks/Tasks";
import FullViewAppBar from "../../ui/Fullviewappbar/FullViewAppBar";

const Full = () => {
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    let user = sessionStorage.getItem("loggedUser");
    user = user ? JSON.parse(user) : null;
    setLoggedUser(user);
  }, []);

  return (
    <>
      <FullViewAppBar />
      <Tasks loggedUser={loggedUser} />
    </>
  );
};

export default Full;
