import { Outlet } from "react-router-dom";
import React from "react";
import MainNavigation from "../MainNavigation";
function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
