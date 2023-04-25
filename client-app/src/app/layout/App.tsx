import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Homepage from "../../features/home/HomePage";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <Homepage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

// export default App;
// We have to make the component observable by wrapping it inside the observer like below.
export default observer(App);
