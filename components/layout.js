import { useRouter } from "next/router";
import Link from 'next/link'
import React, { useContext } from "react";
import Navbar from "./navbar";
import MenuBottom from "./menuBottom";
import { MenuBottomCtx } from "../appContext/store";
import {RiArrowUpSLine} from 'react-icons/ri'
import { capitalize } from "../util/capitalize";

function Layout({ children }) {
  const { homePageRef, id } = useContext(MenuBottomCtx);

  const pageRoute = useRouter();

  const bg = "bg-gradient-to-br from-gray-900 to-gray-800";

  console.log("Layout",id)
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
        <Link href={`${pageRoute.route != "/" ? `#${capitalize(pageRoute.route.replace('/',''))}` : `#homepage`}`}>
          <a className={`fixed ${id !== '#' && id !== 'homepage' ? 'md:block' : 'hidden'} cursor-pointer bottom-10 right-10 xl:bottom-16 xl:right-16 z-40 p-3 rounded-lg bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800`}>
            <RiArrowUpSLine className="animate-ping font-bold"/>
          </a>
        </Link>
      ) : null}
      
      {pageRoute.route !== "/admin" && pageRoute.route !== "/dashboard" ? (
        <MenuBottom />
      ) : null}
    </div>
  );
}

export default Layout;
