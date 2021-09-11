import { useRouter } from "next/router";
import React from "react";
import Navbar from "./navbar";
import MenuBottom from "./menuBottom";

function Layout({ children }) {
  const pageRoute = useRouter();

  const bg = "bg-gradient-to-br from-gray-900 to-gray-800";

  return (
    <div
      id="homepage"
      className={`antialiased relative flex flex-col font-poppins min-h-screen ${
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
