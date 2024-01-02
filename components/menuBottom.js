import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import { MenuBottomCtx, navMenu } from "../appContext/store";
import { capitalize } from "../util/capitalize";

const MenuBottom = () => {
  const { id } = useContext(MenuBottomCtx);
  const route = useRouter()

  return (
    <div className={`fixed md:hidden bottom-2 z-40 w-full px-3`}>
      <div
        className={`flex justify-between items-center transition-all duration-100 ease-linear w-full p-1 mx-auto border border-gray-300 dark:border-gray-700 dark:text-gray-200 text-gray-800 bg-gray-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-2xl`}
      >
        {navMenu.map((menu, i) => {
          return (
            <React.Fragment key={i}>
              {menu.id == 3 ? (
                <Link key={menu.id} href={`${route.route != "/" ? `#${capitalize(route.route.replace('/',''))}` : '#homepage'}`}>
                  <a
                    className={`${
                      id !== "#" && id !== "homepage" ? "flex" : "hidden"
                    } dark:text-gray-300 text-gray-800 items-center p-1 font-light rounded-xl transition-all delay-75 duration-200 ease-in-out`}
                  >
                    <span className="block p-1 text-2xl">
                      <RiArrowUpSLine className="animate-bounce" />
                    </span>
                  </a>
                </Link>
              ) : null}
              <Link key={menu.id + "mobile"} href={`${route.route == "/" ? `#${menu.name}` : capitalize(route.route.replace('/','')) == menu.name ? `#${menu.name}` : `/#${menu.name}`}`}>
                <a
                  className={`${
                    id == menu.name
                      ? "text-gray-300 bg-gray-800 dark:bg-gray-400 dark:text-gray-800"
                      : ""
                  } flex items-center p-1 font-light hover:bg-gray-800 hover:text-gray-300 dark:focus:text-gray-800 dark:focus:bg-gray-400 dark:hover:bg-gray-400 dark:hover:text-gray-800 rounded-xl transition-all delay-75 duration-200 ease-in-out`}
                >
                  <span className="block p-1 text-2xl">{menu.icon}</span>
                </a>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBottom;
