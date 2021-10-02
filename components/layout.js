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
          <a className={`fixed hidden ${id !== '#' && id !== 'homepage' ? 'md:block' : ''} cursor-pointer bottom-20 right-20 xl:right-28 z-40 p-3 rounded-lg bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 transition-all ease-in-out duration-300 delay-75`}>
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
