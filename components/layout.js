import { useRouter } from "next/router";
import React, { useContext } from "react";
import Navbar from "./navbar";
import MenuBottom from "./menuBottom";
import { MenuBottomCtx } from "../appContext/store";

function Layout({ children }) {
  const { homePageRef } = useContext(MenuBottomCtx);

  const pageRoute = useRouter();

  const bg = "bg-gradient-to-br from-gray-900 to-gray-800";

  return (
    <div
      id="homepage"
      ref={homePageRef}
      className={`antialiased relative flex flex-col font-poppins min-h-screen bg-gray-200 dark:bg-gray-800 ${
        pageRoute.route === "/admin" || pageRoute.route === "/dashboard"
          ? bg
          : ""
      }`}
    >
      {pageRoute.route !== "/admin" && pageRoute.route !== "/dashboard" ? (
        <Navbar />
      ) : null}

      {children}

      {pageRoute.route !== "/admin" && pageRoute.route !== "/dashboard" ? (
        <MenuBottom />
      ) : null}
    </div>
  );
}

export default Layout;
