import Link from "next/link";
import React, { useState, useContext } from "react";
import { MenuBottomCtx, navMenu } from "../appContext/store";

const MenuBottom = () => {
  const [scroll, setScroll] = useState(false);
  const { id } = useContext(MenuBottomCtx);

  return (
    <div className={`fixed md:hidden bottom-2 z-40 w-full px-3`}>
      <div
        className={`flex justify-between items-center transition-all duration-100 ease-linear w-full p-1 mx-auto border border-gray-300 dark:border-gray-700 dark:text-gray-200 text-gray-800 bg-gray-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-2xl`}
      >
        {navMenu.map((menu) => {
          return (
            // <Link href="/" key={menu.id + "mobile"}>
            <a
              key={menu.id + "mobile"}
              href={`#${menu.name}`}
              className={`${id == menu.name ? 'text-gray-300 bg-gray-800 dark:bg-gray-400 dark:text-gray-800' : ''} flex items-center p-1 font-light hover:bg-gray-800 hover:text-gray-300 dark:focus:text-gray-800 dark:focus:bg-gray-400 dark:hover:bg-gray-400 dark:hover:text-gray-800 rounded-xl transition-all delay-75 duration-200 ease-in-out`}
            >
              <span className="block p-1 text-2xl">{menu.icon}</span>
            </a>
            // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBottom;
