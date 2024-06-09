import React from "react";
import EventsNavigation from "../EventsNavigation";
import { Outlet } from "react-router-dom";

function EventsRoot() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRoot;
